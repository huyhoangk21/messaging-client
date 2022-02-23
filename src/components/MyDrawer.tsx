import { Theme, useMediaQuery } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Menu from './shared/Menu';
import { useDrawer } from '../hooks/useDrawer';

const MyDrawer = () => {
  const { isDrawerOpen, toggleDrawer } = useDrawer();

  const hideForUpMd = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md')
  );

  if (hideForUpMd) return null;

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(255, 255, 255, 0)',
        },
      }}
    >
      <Menu />
    </Drawer>
  );
};

export default MyDrawer;
