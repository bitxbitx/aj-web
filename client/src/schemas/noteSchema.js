import * as yup from 'yup';

export const noteSchema = yup.object().shape({
    amount: yup.number().required(),
    methods: yup.string().required(),
    image: yup.mixed().test("fileSize", "The file is too large", (value) => {
        if (!value.length) return true // attachment is optional
        return value[0].size <= 2000000
    }),
});

