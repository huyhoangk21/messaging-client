import InfiniteScroll from 'react-infinite-scroll-component';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Message from './Message';
import { useMessages } from '../hooks/useMessages';
import { useTextArea } from '../hooks/useTextArea';

const Messages = () => {
  const { messages, getMoreMessages, hasMoreMessages, bottomRef } =
    useMessages();

  const { textAreaHeight } = useTextArea();

  return (
    <Box
      ref={bottomRef}
      id='scrollableDiv'
      sx={{
        height: '100%',
        marginBottom: textAreaHeight,
        paddingBottom: '20px',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={getMoreMessages}
        style={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
        inverse={true}
        hasMore={hasMoreMessages}
        loader={
          <Box
            sx={{
              textAlign: 'center',
              marginTop: '60px',
            }}
          >
            <CircularProgress />
          </Box>
        }
        scrollableTarget='scrollableDiv'
      >
        {messages
          .map((message, i) => (
            <Message key={message._id} message={message} index={i} />
          ))
          .reverse()}

        {messages.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              color: 'grey.500',
              typography: 'caption',
              marginTop: '20px',
            }}
          >
            Be the first person to send a message
          </Box>
        )}
      </InfiniteScroll>
    </Box>
  );
};

export default Messages;
