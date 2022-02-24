import React from 'react';
import { client } from '../api/apolloClient';
import { useMutation, useQuery } from '@apollo/client';
import {
  GET_ME,
  GET_PRIVATE_ACCESS,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
} from '../api/gql';
import Loading from '../components/Loading';
import { LoginValues } from '../components/SignIn';
import { FormikHelpers } from 'formik';
import { gqlErrorHandler } from '../utils/gqlErrorHandler';
import { SignUpValues } from '../components/SignUp';
import { PrivateValues } from '../components/PrivateForm';

export enum Role {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  ADMIN = 'ADMIN',
}

export interface User {
  username: string;
  role: Role;
}

type AuthContextType = {
  auth: AuthState;
  signUp: (values: SignUpValues, helpers: FormikHelpers<SignUpValues>) => void;
  signUpLoading: boolean;
  signUpError: string;
  signIn: (values: LoginValues, helpers: FormikHelpers<LoginValues>) => void;
  signInLoading: boolean;
  signInError: string;
  signOut: () => void;
  signOutLoading: boolean;
  signOutError: string;
  getPrivateAccess: (
    values: PrivateValues,
    helpers: FormikHelpers<PrivateValues>
  ) => void;
  getPrivateAccessLoading: boolean;
  getPrivateAccessError: string;
};

type AuthState = {
  authenticated: boolean;
  username?: string;
  role?: Role;
};

const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = React.useState<AuthState>({
    authenticated: false,
  });

  const [signUpError, setSignUpError] = React.useState<string>('');
  const [signInError, setSignInError] = React.useState<string>('');
  const [signOutError, setSignOutError] = React.useState<string>('');
  const [getPrivateAccessError, setGetPrivateAccessError] =
    React.useState<string>('');

  const { loading } = useQuery(GET_ME, {
    onCompleted: data => {
      if (data.getMe !== null) {
        const { username, role } = data.getMe as User;
        setAuth({
          authenticated: true,
          username,
          role,
        });
      }
      console.log('get me');
    },
  });

  const [signUpMutation, signUpMeta] = useMutation(SIGN_UP, {
    onCompleted: data => {
      const { username, role } = data.signupUser as User;
      setAuth({
        authenticated: true,
        username,
        role,
      });
      client.clearStore();
    },
    onError: err => {
      setSignUpError(gqlErrorHandler(err));
    },
  });

  const signUp = async (
    { username, password, confirmPassword }: SignUpValues,
    { resetForm }: FormikHelpers<SignUpValues>
  ) => {
    signUpMutation({
      variables: {
        userInput: {
          username,
          password,
          confirmPassword,
        },
      },
    });
    resetForm();
  };

  const [signInMutation, signInMeta] = useMutation(SIGN_IN, {
    onCompleted: data => {
      const { username, role } = data.signinUser;
      setAuth({
        authenticated: true,
        username,
        role,
      });
      client.clearStore();
    },
    onError: err => {
      setSignInError(gqlErrorHandler(err));
    },
  });

  const signIn = (
    { username, password }: LoginValues,
    { resetForm }: FormikHelpers<LoginValues>
  ) => {
    signInMeta.reset();
    signInMutation({
      variables: {
        userInput: {
          username,
          password,
        },
      },
    });
    resetForm();
  };

  const [signOutMutation, signOutMeta] = useMutation(SIGN_OUT, {
    onCompleted: () => {
      setAuth({ authenticated: false });
      client.clearStore();
    },
    onError: err => {
      setSignOutError(gqlErrorHandler(err));
    },
  });

  const [getPrivateAccessMutation, getPrivateAccessMeta] = useMutation(
    GET_PRIVATE_ACCESS,
    {
      onCompleted: data => {
        const { role } = data.upgradeUser as User;
        client.resetStore();
        setAuth(prevAuth => ({ ...prevAuth, role }));
      },
      onError: err => {
        setGetPrivateAccessError(gqlErrorHandler(err));
      },
    }
  );

  const getPrivateAccess = async (
    { code }: PrivateValues,
    { resetForm }: FormikHelpers<PrivateValues>
  ) => {
    getPrivateAccessMutation({
      variables: {
        code,
      },
    });
    resetForm();
  };

  const value = {
    auth,
    signIn,
    signInLoading: signInMeta.loading,
    signInError,
    signUp,
    signUpLoading: signUpMeta.loading,
    signUpError,
    signOut: signOutMutation,
    signOutLoading: signOutMeta.loading,
    signOutError,
    getPrivateAccess,
    getPrivateAccessLoading: getPrivateAccessMeta.loading,
    getPrivateAccessError,
  };

  if (loading)
    return (
      <Loading
        sxProps={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      />
    );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
