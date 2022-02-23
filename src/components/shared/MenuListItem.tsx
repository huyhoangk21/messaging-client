import Box from '@mui/material/Box';

type MenuListItemProps = {
  children: React.ReactNode;
  isActive?: boolean;
};

const MenuListItem = ({ children, isActive }: MenuListItemProps) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      padding: '5px',
      borderRadius: '5px',
      marginTop: '10px',
      transition: 'all 0.3s',
      cursor: 'pointer',
      '&:hover, &:focus': {
        boxShadow: 5,
        color: 'primary.main',
      },
      ...(isActive && {
        boxShadow: 5,
        color: 'primary.main',
      }),
    }}
  >
    {children}
  </Box>
);

export default MenuListItem;
