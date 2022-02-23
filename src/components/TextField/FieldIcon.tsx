import Box from '@mui/material/Box';
import { useField } from 'formik';
import React from 'react';

type FieldIconProps = {
  children?: React.ReactNode;
  name: string;
  isHovered: boolean;
  isFocused: boolean;
};

const FieldIcon = ({
  name,
  children,
  isFocused,
  isHovered,
}: FieldIconProps) => {
  const [_, meta] = useField(name);
  const { touched, error } = meta;
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '13px',
        left: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'grey.500',
        ...((isHovered || isFocused) && {
          color: 'primary.main',
        }),
        ...(touched &&
          error && {
            color: 'error.main',
          }),
        pointerEvents: 'none',
      }}
    >
      {children}
    </Box>
  );
};

export default FieldIcon;
