import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, { message: "Password must contain at 1 upper case letter, 1 lower case letter, and 1 numeric digit." })
        .required("Required")
});

        