import React from 'react';
import Box from '@mui/material/Box';

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateRows: '50px',
      }}
    >
      {children}
    </Box>
  );
};

export default Main;
