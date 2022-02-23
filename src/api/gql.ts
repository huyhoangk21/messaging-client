import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    getMe {
      username
      role
    }
  }
`;

export const SIGN_IN = gql`
  mutation signinUser($userInput: UserInput!) {
    signinUser(userInput: $userInput) {
      username
      role
    }
  }
`;

export const SIGN_UP = gql`
  mutation signupUser($userInput: UserInput!) {
    signupUser(userInput: $userInput) {
      username
      role
    }
  }
`;

export const SIGN_OUT = gql`
  mutation signoutUser {
    signoutUser
  }
`;

export const GET_PRIVATE_ACCESS = gql`
  mutation upgradeUser($code: String!) {
    upgradeUser(code: $code)
  }
`;

export const SEND_MESSAGE_TO_CHANNEL = gql`
  mutation sendMessageToChannel($messageInput: MessageInput!) {
    sendMessageToChannel(messageInput: $messageInput)
  }
`;

export const GET_MESSAGES_BY_CHANNEL = gql`
  query getMessagesByChannel($cursor: String!, $channel: String!) {
    getMessagesByChannel(cursor: $cursor, channel: $channel) {
      cursor
      hasMore
      messages {
        _id
        user {
          username
        }
        channel
        text
        deleted
        sentAt
      }
    }
  }
`;

export const MESSAGE_SENT_TO_CHANNEL = gql`
  subscription messageSentToChannel($channel: String!) {
    messageSentToChannel(channel: $channel) {
      _id
      user {
        username
      }
      channel
      text
      deleted
      sentAt
    }
  }
`;

export const MESSAGE_DELETED_TO_CHANNEL = gql`
  subscription messageDeletedById($channel: String!) {
    messageDeletedById(channel: $channel) {
      _id
      user {
        username
      }
      channel
      text
      deleted
      sentAt
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation deleteMessageById($messageId: String!) {
    deleteMessageById(messageId: $messageId)
  }
`;
