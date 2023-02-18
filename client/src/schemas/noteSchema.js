import * as yup from 'yup';

// TODO: Add image validation

export const noteSchema = yup.object().shape({
    amount: yup.number().required(),
    methods: yup.string().required(),
    // image: yup.string().required(),
});

