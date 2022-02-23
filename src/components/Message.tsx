import React from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Message as MessageType, useMessages } from '../hooks/useMessages';
import { useAuth } from '../hooks/useAuth';
import { cssVariables } from '../theme';

dayjs.extend(localizedFormat);

type MessageProps = {
  message: MessageType;
  index: number;
};

const Message = ({ message, index }: MessageProps) => {
  const {
    auth: { username },
  } = useAuth();

  const { messages, deleteMessageById } = useMessages();

  const mine = username === message.user.username;

  const hideTop = () => {
    return (
      index > 0 &&
      messages[index].user.username === messages[index - 1].user.username &&
      !longInterval(index, index - 1, 20 * 60 * 1000)
    );
  };

  const hideBottom = () => {
    return (
      index < messages.length - 1 &&
      messages[index].user.username === messages[index + 1].user.username &&
      !longInterval(index, index + 1, 20 * 60 * 1000)
    );
  };

  const longInterval = (index1: number, index2: number, interval: number) => {
    const date1 = new Date(messages[index1].sentAt);
    const date2 = new Date(messages[index2].sentAt);
    return Math.abs(date1.getTime() - date2.getTime()) > interval;
  };

  const differentDay = (index1: number, index2: number) => {
    const date1 = new Date(messages[index1].sentAt);
    const date2 = new Date(messages[index2].sentAt);
    return Math.abs(date1.getDay() - date2.getDay()) >= 1;
  };

  const showDateDivider = () => {
    if (index === 0) return true;
    return differentDay(index, index - 1) && differentDay(index, 0);
  };

  return (
    <React.Fragment>
      <Box
        onClick={() => deleteMessageById(message._id)}
        sx={{
          marginTop: '50px',
          marginX: ['40px', '70px'],
          maxWidth: ['225px', '375px', '600px'],
          alignSelf: 'flex-start',
          position: 'relative',
          ...(mine && {
            alignSelf: 'flex-end',
          }),
          ...(hideTop() &&
            hideBottom() && {
              marginY: '5px',
            }),
          ...(hideBottom() && {
            marginBottom: '5px',
          }),
          ...(hideTop() && {
            marginTop: '5px',
          }),
        }}
      >
        <Box
          sx={{
            fontWeight: 600,
            fontSize: '0.8em',
            position: 'absolute',
            top: '-20px',
            ...(mine && {
              right: 0,
            }),
          }}
        >
          {!hideTop() && message.user.username}
        </Box>
        <Box
          sx={{
            wordWrap: 'break-word',
            boxShadow: 5,
            padding: '5px 20px',
            borderRadius: '20px',
            fontSize: '0.875em',
            ...(mine && {
              color: 'common.white',
              background: cssVariables.background.gradient,
            }),
            ...(message.deleted && {
              color: 'grey.400',
              boxShadow: 0,
              border: '1px solid',
              fontStyle: 'italic',
              background: '',
            }),
          }}
        >
          {message.deleted ? 'This message was deleted by admin' : message.text}
        </Box>
        <Box
          sx={{
            textAlign: 'right',
            typography: 'caption',
            fontSize: '0.70em',
            marginTop: '5px',
            color: 'grey.600',
            ...(mine && {
              textAlign: 'left',
            }),
          }}
        >
          {!hideBottom() && dayjs(message.sentAt).format('LT')}
        </Box>
      </Box>
      {showDateDivider() && (
        <Divider
          variant='middle'
          sx={{
            marginY: ['10px', '30px'],
            marginX: 'auto',
            color: 'grey.500',
            typography: 'subtitle2',
            width: ['80%', '84%', '90%'],
          }}
        >
          {dayjs(message.sentAt).format('ll')}
        </Divider>
      )}
    </React.Fragment>
  );
};

export default Message;
