import React from 'react';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import {
  SEND_MESSAGE_TO_CHANNEL,
  GET_MESSAGES_BY_CHANNEL,
  MESSAGE_SENT_TO_CHANNEL,
  DELETE_MESSAGE,
  MESSAGE_DELETED_TO_CHANNEL,
} from '../api/gql';
import { useParams } from 'react-router-dom';
import { Role, useAuth, User } from './useAuth';
import Loading from '../components/Loading';

export enum Channel {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export type Message = {
  _id: string;
  text: string;
  channel: string;
  user: Omit<User, 'role'>;
  deleted: boolean;
  sentAt: string;
};

export type MessageFeed = {
  messages: Message[];
  cursor: string;
  hasMore: boolean;
};

type MessagesContextType = {
  bottomRef: React.RefObject<HTMLDivElement>;
  messages: Message[];
  getMessagesError?: ApolloError;
  sendMessage: (
    text: string,
    cb: VoidFunction
  ) => (e: React.KeyboardEvent | React.MouseEvent) => void;
  getMoreMessages: () => void;
  sendMessageError?: ApolloError;
  sendMessageLoading: boolean;
  hasMoreMessages: boolean;
  deleteMessageById: (messageId: string) => void;
  deleteMessageError?: ApolloError;
  scrollToBottom: VoidFunction;
};

const MessagesContext = React.createContext<MessagesContextType>(null!);

export const MessagesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let { channel } = useParams();

  channel = channel?.toUpperCase();

  const {
    auth: { role },
  } = useAuth();

  const [messages, setMessages] = React.useState<Message[]>([]);
  const [hasMoreMessages, setHasMoreMessages] = React.useState<boolean>(null!);

  const bottomRef = React.useRef<HTMLDivElement>(null!);

  const { data, error, loading, subscribeToMore, fetchMore } = useQuery(
    GET_MESSAGES_BY_CHANNEL,
    {
      variables: {
        cursor: '',
        channel,
      },
      onCompleted: data => {
        const { messages, hasMore }: MessageFeed = data.getMessagesByChannel;
        setMessages(messages);
        setHasMoreMessages(hasMore);
      },
      onError: err => {},
    }
  );

  const [sendMessageMutation, sendMessageMeta] = useMutation(
    SEND_MESSAGE_TO_CHANNEL
  );

  const [deleteMessageByIdMutation] = useMutation(DELETE_MESSAGE);

  React.useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGE_SENT_TO_CHANNEL,
      variables: {
        channel,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newMessage: Message = subscriptionData.data.messageSentToChannel;
        const { cursor, hasMore, messages }: MessageFeed =
          prev.getMessagesByChannel;
        return {
          getMessagesByChannel: {
            hasMore,
            cursor,
            messages: [...messages, newMessage],
          },
        };
      },
      onError: e => {
        console.log(e);
      },
    });

    return () => unsubscribe();
  }, [channel, subscribeToMore]);

  React.useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGE_DELETED_TO_CHANNEL,
      variables: {
        channel,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const deletedMessage: Message =
          subscriptionData.data.messageDeletedById;

        const { cursor, hasMore, messages }: MessageFeed =
          prev.getMessagesByChannel;

        const deletedIndex = messages.findIndex(
          message => message._id === deletedMessage._id
        );

        return {
          getMessagesByChannel: {
            hasMore,
            cursor,
            messages: [
              ...messages.slice(0, deletedIndex),
              deletedMessage,
              ...messages.slice(deletedIndex + 1),
            ],
          },
        };
      },
      onError: e => {
        console.log(e);
      },
    });

    return () => unsubscribe();
  }, [channel, subscribeToMore]);

  const sendMessage =
    (text: string, cb: VoidFunction) =>
    (e: React.KeyboardEvent | React.MouseEvent) => {
      if (e.type === 'keypress' && (e as React.KeyboardEvent).key === 'Enter') {
        e.preventDefault();
      }
      if (
        !text.trim() ||
        (e.type === 'keypress' && (e as React.KeyboardEvent).key !== 'Enter')
      )
        return;

      sendMessageMutation({
        variables: {
          messageInput: {
            text: text.trim(),
            channel,
          },
        },
      });
      cb();
      scrollToBottom();
    };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollTo({ top: 0 });
    }
  };

  const getMoreMessages = () => {
    const { cursor }: MessageFeed = data.getMessagesByChannel;
    fetchMore({
      variables: {
        cursor,
        channel,
      },
    });
  };

  const deleteMessageById = (messageId: string) => {
    if (role !== Role.ADMIN) return;
    deleteMessageByIdMutation({
      variables: {
        messageId,
      },
    });
  };

  const value = {
    bottomRef,
    messages,
    getMessagesError: error,
    sendMessage,
    sendMessageError: sendMessageMeta.error,
    sendMessageLoading: sendMessageMeta.loading,
    getMoreMessages,
    hasMoreMessages,
    deleteMessageById,
    scrollToBottom,
  };

  if (loading) return <Loading />;
  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => React.useContext(MessagesContext);
