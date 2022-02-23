import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Messages from './Messages';
import TextArea from './TextArea';
import PrivateForm from './PrivateForm';
import Loading from './Loading';
import { Role, useAuth } from '../hooks/useAuth';
import { Channel as ChannelName, useMessages } from '../hooks/useMessages';

const Channel = () => {
  const { auth } = useAuth();
  const { channel } = useParams();
  const { getMessagesError } = useMessages();

  if (
    channel?.toUpperCase() === ChannelName.PRIVATE &&
    auth.role === Role.PUBLIC
  ) {
    return <PrivateForm />;
  }

  if (
    getMessagesError &&
    getMessagesError.graphQLErrors[0].extensions.code !== 'FORBIDDEN'
  ) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'error.main',
        }}
      >
        The server encountered an error. Please try again later!
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
    >
      <Messages />
      <TextArea />
    </Box>
  );
};

export default Channel;
