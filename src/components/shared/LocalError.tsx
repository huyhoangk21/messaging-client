import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

type LocalErrorProps = {
  children: React.ReactNode;
  BoxProps?: SxProps<Theme>;
};

const LocalError = ({ children, BoxProps }: LocalErrorProps) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        color: 'error.main',
        typography: 'caption',
        ...BoxProps,
      }}
    >
      {children}
    </Box>
  );
};

export default LocalError;
