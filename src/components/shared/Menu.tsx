import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Logo from './Logo';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';
import MyButton from './MyButton';
import MenuListItem from './MenuListItem';
import { useDrawer } from '../../hooks/useDrawer';
import { useAuth } from '../../hooks/useAuth';
import { Link, useParams } from 'react-router-dom';

const Menu = () => {
  const { signOut, signOutLoading } = useAuth();

  const { toggleDrawer } = useDrawer();

  const { channel } = useParams();

  return (
    <Box
      sx={{
        width: [275, 350, 400, 500],
        borderRight: '1px solid',
        color: 'grey.300',
        minHeight: '500px',
        height: '100vh',
      }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          height: '100%',
          width: '90%',
          paddingY: '70px',
          display: 'flex',
          marginX: 'auto',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Box sx={{ textAlign: 'center' }}>
            <Logo />
          </Box>
          <Box>
            <Box
              sx={{
                textTransform: 'uppercase',
                typography: 'caption',
                fontWeight: 600,
                marginTop: '50px',
                color: 'common.black',
              }}
            >
              Channels
            </Box>
            <Divider />
            <Link
              to='/channels/public'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <MenuListItem isActive={channel === 'public'}>
                <PublicIcon sx={{ marginRight: '10px' }} />
                Public
              </MenuListItem>
            </Link>
            <Link
              to='/channels/private'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <MenuListItem isActive={channel === 'private'}>
                <SecurityIcon sx={{ marginRight: '10px' }} />
                Private
              </MenuListItem>
            </Link>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <MyButton
            onButtonClick={signOut}
            startIcon={<LogoutIcon />}
            isSubmitting={signOutLoading}
            name='Log out'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Menu;
