import IconButton from '@mui/material/IconButton';
import Box from '@mui/system/Box';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import { useTextArea } from '../hooks/useTextArea';
import { useMessages } from '../hooks/useMessages';

const TextArea = () => {
  const {
    textAreaRef,
    text,
    textAreaHeight,
    textAreaContainerHeight,
    updateTextArea,
    trimTextArea,
    resetTextArea,
  } = useTextArea();

  const { sendMessage } = useMessages();

  return (
    <Box
      sx={{
        minHeight: textAreaContainerHeight,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 70px 50px',
        alignItems: 'flex-end',
        borderTop: '1px solid',
        backgroundColor: 'common.white',
        color: 'grey.300',
      }}
    >
      <textarea
        onKeyPress={sendMessage(text, resetTextArea)}
        onChange={updateTextArea}
        onBlur={trimTextArea}
        value={text}
        ref={textAreaRef}
        style={{
          height: textAreaHeight,
          resize: 'none',
          border: 'none',
          outline: 'none',
          fontSize: '16px',
          padding: '16px 20px',
        }}
        placeholder='Type something...'
        maxLength={250}
        rows={1}
      />

      <Box
        sx={{
          typography: 'caption',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          color: 'grey.600',
        }}
      >
        {text.length}/250
      </Box>
      <Box
        sx={{
          height: '50px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton
          sx={{ boxShadow: 2 }}
          onClick={sendMessage(text, resetTextArea)}
        >
          <SendSharpIcon
            sx={{
              color: 'common.white',
              fontSize: 14,
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TextArea;
