import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const usernameRegex = "^[A-Za-z0-9_.@-]{8,30}$";

export const createAccountSchema = yup.object().shape({
    username: yup.string()
        .matches(usernameRegex, "Username is not within 8-30 characters long or contains illegal characters.")
        .required('Username is required'),
    password: yup
        .string()
        .min(6)
        .matches(passwordRules, { message: "Password must contain at 1 upper case letter, 1 lower case letter, and 1 numeric digit." })
        .required("Required"),
    confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
    email: yup.string().email('Invalid email').required('Email is required'),
    birthdate: yup.date().required('Birthdate is required'),
    role: yup.string().required('Role is required').oneOf(['admin', 'customer', 'staff'], 'Role must be either admin, user, or staff')
});