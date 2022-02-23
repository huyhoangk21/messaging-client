import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = ({ sxProps }: { sxProps?: SxProps<Theme> }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...sxProps,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
