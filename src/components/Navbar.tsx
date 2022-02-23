import React from 'react';
import { Box, Theme, useMediaQuery } from '@mui/material';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import { cssVariables } from '../theme';
import MyDrawer from './MyDrawer';
import { useDrawer } from '../hooks/useDrawer';
import { useParams } from 'react-router-dom';

const Navbar = () => {
  const { isDrawerOpen, toggleDrawer } = useDrawer();
  const hideForUpMd = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md')
  );

  const { channel } = useParams();

  const channelName = () => {
    if (channel && channel?.toUpperCase() === 'PUBLIC') {
      return (
        <React.Fragment>
          <PublicIcon fontSize='medium' sx={{ marginRight: '10px' }} />
          Public
        </React.Fragment>
      );
    }
    if (channel && channel?.toUpperCase() === 'PRIVATE') {
      return (
        <React.Fragment>
          <SecurityIcon sx={{ marginRight: '10px' }} />
          Private
        </React.Fragment>
      );
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        color: 'grey.300',
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        background: cssVariables.background.gradient,
        borderBottom: '1px solid',
      }}
    >
      <Box
        sx={{
          color: 'common.white',
          height: '100%',
          paddingX: '20px',
          display: 'flex',
          alignItems: 'center',
          typography: 'body1',
          textTransform: 'uppercase',
        }}
      >
        {channelName()}
      </Box>
      {!hideForUpMd && (
        <Box
          sx={{
            height: '100%',
            paddingX: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: 'common.white',
          }}
        >
          <MenuSharpIcon
            fontSize='medium'
            onClick={toggleDrawer(!isDrawerOpen)}
          />
          <MyDrawer />
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
