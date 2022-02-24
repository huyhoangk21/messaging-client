import { Navigate, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Aside from './Aside';
import Main from './Main';
import MyDrawer from './MyDrawer';
import Navbar from './Navbar';
import { useAuth } from '../hooks/useAuth';
import { DrawerProvider } from '../hooks/useDrawer';
import { TextAreaProvider } from '../hooks/useTextArea';
import { MessagesProvider } from '../hooks/useMessages';

const Layout = () => {
  const {
    auth: { authenticated },
  } = useAuth();

  if (!authenticated) return <Navigate to='/' />;

  return (
    <DrawerProvider>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Aside />
        <Main>
          <Navbar />
          <MyDrawer />
          <TextAreaProvider>
            <MessagesProvider>
              <Outlet />
            </MessagesProvider>
          </TextAreaProvider>
        </Main>
      </Box>
    </DrawerProvider>
  );
};

export default Layout;
