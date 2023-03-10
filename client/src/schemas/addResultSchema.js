import * as yup from 'yup';

export const addResultSchema = yup.object().shape({
    results: yup.array().of(
        yup.object().shape({
            amount: yup.number().required('Amount is required'),
            account: yup.string().required('Account is required'),
            platform: yup.string().required('Platform is required')
        })
    )
});