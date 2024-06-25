import { object, string, array } from "yup";
export const schema = object().shape({
  name: string().required(),
  newQuestions: array().of(
    object().shape({
      question: string().required(),
      answer: string().required(),
    })
  ),
});
