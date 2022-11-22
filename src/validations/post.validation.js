import * as yup from 'yup';

export const postValidation = yup.object().shape({
    authorId: yup.number().required(),
    title: yup.string().required(),
    content: yup.string().required(),
    author: yup.string().required(),
});