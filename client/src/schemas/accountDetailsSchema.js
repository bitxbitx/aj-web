import * as yup from 'yup';

export const accountDetailsSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    birthday: yup.string().required('Birthday is required')
});
