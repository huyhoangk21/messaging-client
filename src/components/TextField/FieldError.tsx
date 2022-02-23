import { Box } from '@mui/material';
import { useField } from 'formik';

type FieldErrorProps = {
  name: string;
};

const FieldError = ({ name }: FieldErrorProps) => {
  const [_, meta] = useField(name);

  const { touched, error } = meta;

  if (!touched) return null;

  return (
    <Box
      sx={{
        typography: 'caption',
        color: 'error.main',
        position: 'absolute',
        top: '40px',
      }}
    >
      {error}
    </Box>
  );
};

export default FieldError;
