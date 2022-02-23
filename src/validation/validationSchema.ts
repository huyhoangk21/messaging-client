import * as Yup from 'yup';

export const signInSchema = Yup.object().shape({
  username: Yup.string().required('username is required').trim(),
  password: Yup.string().required('password is required').trim(),
});

export const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .required('username is required')
    .min(4, 'username must be between 4-10 characters')
    .max(10, 'username must be between 4-10 characters')
    .trim(),
  password: Yup.string()
    .required('password is required')
    .min(6, 'password must be at least 6 characters')
    .trim(),
  confirmPassword: Yup.string()
    .required('comfirm password is required')
    .oneOf([Yup.ref('password'), null], 'passwords do not match'),
});
