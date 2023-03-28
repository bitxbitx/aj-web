import * as yup from 'yup';

export const accountDetailsSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    birthdate: yup.string().required('Birthday is required')
});
