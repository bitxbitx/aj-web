import * as yup from 'yup';

export const createAccountSchema = yup.object().shape({
    username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters long'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
    confirm_password: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
    email: yup.string().required('Email is required').email('Email must be a valid email address'),
    birthdate: yup.date().required('Birthdate is required'),
    role: yup.string().required('Role is required').oneOf(['admin', 'user', 'staff'], 'Role must be either admin, user, or staff')
});