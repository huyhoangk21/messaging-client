import { Link as RouterLink, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { Formik, Form, FormikProps } from 'formik';
import Logo from './shared/Logo';
import TextField from './TextField/TextField';
import Container from './shared/Container';
import LocalError from './shared/LocalError';
import MyButton from './shared/MyButton';
import { useAuth } from '../hooks/useAuth';
import { signUpSchema as validationSchema } from '../validation/validationSchema';

export interface SignUpValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const initialValues: SignUpValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const {
    auth: { authenticated },
    signUp,
    signUpLoading,
    signUpError,
  } = useAuth();

  if (authenticated) return <Navigate to='/channels/public' />;

  return (
    <Container BoxProps={{ marginTop: ['60px', '100px'] }}>
      <Box textAlign='center' marginBottom='30px'>
        <Logo />
      </Box>
      <Box marginBottom='20px'>
        <Box typography='h5' fontWeight={600}>
          Create Account
        </Box>
        <Box typography='subtitle2' color='grey.600'>
          To chat with people from all over the world
        </Box>
      </Box>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur
          onSubmit={signUp}
        >
          {({ isSubmitting }: FormikProps<SignUpValues>) => (
            <Form>
              <Box sx={{ marginBottom: '30px' }}>
                <TextField
                  label='username'
                  type='text'
                  name='username'
                  icon={<PersonOutlineIcon />}
                  autoComplete='off'
                />
              </Box>
              <Box sx={{ marginBottom: '30px' }}>
                <TextField
                  label='password'
                  name='password'
                  type='password'
                  icon={<VpnKeyOutlinedIcon />}
                  autoComplete='off'
                />
              </Box>
              <Box sx={{ marginBottom: '30px' }}>
                <TextField
                  label='confirm password'
                  name='confirmPassword'
                  type='password'
                  icon={<VpnKeyOutlinedIcon />}
                  autoComplete='off'
                />
              </Box>
              <Box sx={{ marginTop: '50px', textAlign: 'center' }}>
                <MyButton
                  isSubmitting={signUpLoading || isSubmitting}
                  name='Sign Up'
                  type='submit'
                  endIcon={<ArrowForwardSharpIcon />}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Box
        sx={{
          marginTop: '10px',
          typography: 'caption',
          color: 'grey.600',
          textAlign: 'center',
        }}
      >
        Already have an account?{' '}
        <Link underline='none' fontWeight={600} component={RouterLink} to='/'>
          Sign in
        </Link>
      </Box>
      <LocalError BoxProps={{ marginTop: ['10px', '30px'] }}>
        {signUpError}
      </LocalError>
    </Container>
  );
};

export default SignUp;
