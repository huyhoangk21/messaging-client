import { Theme, useMediaQuery } from '@mui/material';
import Menu from './shared/Menu';

const Aside = () => {
  const isUpMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  if (!isUpMd) return null;

  return <Menu />;
};

export default Aside;
