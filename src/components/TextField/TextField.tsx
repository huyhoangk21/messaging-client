import React from 'react';
import Box from '@mui/material/Box';
import FieldLabel from './FieldLabel';
import FieldInput from './FieldInput';
import FieldIcon from './FieldIcon';
import FieldError from './FieldError';

import { useField } from 'formik';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    label: string;
    name: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    shouldNotShowError?: boolean;
  };

const TextField = ({
  icon,
  label,
  name,
  shouldNotShowError = true,
  ...inputProps
}: TextFieldProps) => {
  const [_, meta] = useField(name);
  const { touched, error } = meta;
  const [isHovered, setHovered] = React.useState<boolean>(false);
  const [isFocused, setFocused] = React.useState<boolean>(false);

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: 'relative',
        width: '100%',
        color: 'grey.500',
        ...((isHovered || isFocused) && {
          color: 'primary.main',
        }),
        ...(touched &&
          error && {
            color: 'error.main',
          }),
        borderBottom: '1px solid',
        boxShadow:
          shouldNotShowError && (isFocused || (!meta.error && meta.touched))
            ? '5'
            : '',
        transition: 'box-shadow 0.3s',
      }}
    >
      <FieldIcon isHovered={isHovered} isFocused={isFocused} name={name}>
        {icon}
      </FieldIcon>
      <FieldLabel
        name={name}
        label={label}
        isHovered={isHovered}
        isFocused={isFocused}
      />
      <FieldInput name={name} {...inputProps} setFocused={setFocused} />
      <FieldError name={name} />
    </Box>
  );
};

export default TextField;
