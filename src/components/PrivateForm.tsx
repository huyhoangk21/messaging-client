import { Form, Formik, FormikProps } from 'formik';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import TextField from './TextField/TextField';
import MyButton from './shared/MyButton';
import LocalError from './shared/LocalError';
import { useAuth } from '../hooks/useAuth';

export interface PrivateValues {
  code: string;
}

const PrivateForm = () => {
  const initialValues: PrivateValues = { code: '' };
  const { getPrivateAccess, getPrivateAccessError, getPrivateAccessLoading } =
    useAuth();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          typography: 'subtitle2',
          color: 'grey.600',
          marginBottom: '10px',
        }}
      >
        Enter the access code to continue
      </Box>
      <Formik initialValues={initialValues} onSubmit={getPrivateAccess}>
        {({ isSubmitting }: FormikProps<PrivateValues>) => (
          <Form>
            <Box sx={{ marginBottom: '30px' }}>
              <TextField
                label='access code'
                type='text'
                name='code'
                icon={<LockOutlinedIcon />}
                shouldNotShowError={false}
                autoComplete='off'
              />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <MyButton
                isSubmitting={getPrivateAccessLoading || isSubmitting}
                name='Get access'
                type='submit'
                endIcon={<ArrowForwardSharpIcon />}
                sxProps={{ width: '130px' }}
              />
            </Box>
          </Form>
        )}
      </Formik>
      <LocalError BoxProps={{ marginTop: ['30px'] }}>
        &nbsp;{getPrivateAccessError}
      </LocalError>
    </Box>
  );
};

export default PrivateForm;
