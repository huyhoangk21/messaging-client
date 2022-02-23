import Box from '@mui/material/Box';
import { useField } from 'formik';
import React from 'react';

type FieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  name: string;
  label: string;
  isHovered: boolean;
  isFocused: boolean;
};

const FieldLabel = ({
  name,
  label,
  isHovered,
  isFocused,
  ...labelProps
}: FieldLabelProps) => {
  const [_, meta] = useField(name);
  const { error, touched } = meta;
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '20px',
        fontSize: '0.75em',
        textTransform: 'uppercase',
        marginLeft: '40px',
        transition: 'transform 0.3s',
        color: 'grey.500',
        ...((isHovered || isFocused) && {
          color: 'primary.main',
        }),
        ...(touched &&
          error && {
            color: 'error.main',
          }),
        transform:
          (meta.value || isFocused || isHovered) &&
          'translateY(-17px) scale(0.75) translateX(-10px)',
        pointerEvents: 'none',
      }}
    >
      <label {...labelProps}>{label}</label>
    </Box>
  );
};

export default FieldLabel;
