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
import { signInSchema as validationSchema } from '../validation/validationSchema';

export interface LoginValues {
  username: string;
  password: string;
}

const SignIn = () => {
  const initialValues: LoginValues = { username: '', password: '' };

  const {
    auth: { authenticated },
    signIn,
    signInLoading,
    signInError,
  } = useAuth();

  if (authenticated) return <Navigate to='/channels/public' />;

  return (
    <Container BoxProps={{ marginTop: ['100px', '140px'] }}>
      <Box textAlign='center' marginBottom='30px'>
        <Logo />
      </Box>
      <Box marginBottom='20px'>
        <Box typography='h5' fontWeight={600}>
          Login
        </Box>
        <Box typography='subtitle2' color='grey.600'>
          Please sign in to continue
        </Box>
      </Box>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur
          onSubmit={signIn}
        >
          {({ isSubmitting }: FormikProps<LoginValues>) => (
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
              <Box sx={{ marginTop: '50px', textAlign: 'center' }}>
                <MyButton
                  isSubmitting={signInLoading || isSubmitting}
                  name='Sign In'
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
        Don't have an account?{' '}
        <Link
          underline='none'
          fontWeight={600}
          component={RouterLink}
          to='/signup'
        >
          Sign up
        </Link>
      </Box>
      <LocalError BoxProps={{ marginTop: ['10px', '30px'] }}>
        {signInError}
      </LocalError>
    </Container>
  );
};

export default SignIn;
