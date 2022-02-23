import styled from '@emotion/styled';
import { useField } from 'formik';
import React from 'react';

type FieldInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  setFocused: React.Dispatch<boolean>;
};

const Input = styled('input')({
  width: '100%',
  padding: '20px 40px 0 40px',
  outline: 'none',
  border: 'none',
  fontWeight: 700,
  fontFamily: 'inherit',
});

const FieldInput = ({ name, setFocused, ...props }: FieldInputProps) => {
  const [field, meta, helpers] = useField<string>(name);

  return (
    <Input
      {...field}
      {...props}
      value={meta.value.trim()}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        helpers.setValue(e.currentTarget.value)
      }
      onFocus={() => setFocused(true)}
      onBlur={() => {
        helpers.setTouched(true);
        setFocused(false);
      }}
    />
  );
};

export default FieldInput;
