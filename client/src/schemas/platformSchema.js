import * as yup from 'yup';

export const platformSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    icon: yup.mixed().required().test("fileSize", "The file is too large", (value) => {
        return value.size <= 2000000
    }),
});

