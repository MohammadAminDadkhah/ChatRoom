import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
    email: yup.string()
        .required('Email is required'),
    password: yup.string()
        .required('Password is required'),
});

export const RegisterSchema = yup.object().shape({
    email: yup.string()
        .required('Email is required'),
    name: yup.string()
        .required('Name is required'),
    username: yup.string()
        .required('Username is required'),
    password: yup.string()
        .required('Password is required'),
});