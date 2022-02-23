import { Theme } from '@emotion/react';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  BoxProps?: SxProps<Theme>;
};
const Container = ({ children, BoxProps }: ContainerProps) => {
  return (
    <Box
      sx={{
        width: [260, 300],
        display: 'flex',
        flexDirection: 'column',
        marginX: 'auto',
        marginBottom: '200px',
        ...BoxProps,
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
