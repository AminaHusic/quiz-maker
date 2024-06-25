import { useQuery } from "@tanstack/react-query";

import Checkbox from "./Checkbox";
import { QuizDataProps } from "./AddQuizForm";

import { api } from "../helpers/api";
import { allQuestions } from "../mockData/allQuizzes";

interface ChooseQuestionsProps {
  quizData: QuizDataProps;
  setQuiz: (value: QuizDataProps) => void;
  isNew: boolean;
}
const ChooseQuestions = ({
  setQuiz,
  quizData,
  isNew,
}: ChooseQuestionsProps) => {
  const getValue = (id: number) => {
    const value = quizData.existingQuestions.find(
      (element) => element.id === id
    )?.id;
    if (value) return value;
    else return 0;
  };

  const allQuestionsData = useQuery({
    queryKey: ["all-questions"],
    queryFn: () => api.getQuestions(),
  });

  const filterKeys = new Set(quizData.newQuestions.map((item) => item.id));
  const questions = allQuestions.filter(
    (element) => !filterKeys.has(element.id)
  );

  const existingQuestions = isNew ? allQuestions : questions;

  return (
    <div className=" bg-transparent flex flex-wrap gap-3 items-stretch max-h-[500px] overflow-y-scroll custom-scroll  rounded p-3 ">
      {existingQuestions.map((question) => (
        <Checkbox
          value={getValue(question.id) as number}
          key={question.id}
          text={question.question}
          onChange={() => {
            const findIndex = quizData.existingQuestions.findIndex(
              (item) => question.id === item.id
            );

            if (findIndex === -1) {
              setQuiz({
                ...quizData,
                existingQuestions: [
                  ...quizData.existingQuestions,
                  {
                    question: question.question,
                    answer: question.answer,
                    id: question.id,
                  },
                ],
              });
            } else {
              setQuiz({
                ...quizData,
                existingQuestions: quizData.existingQuestions.filter(
                  (element) => question.id === element.id
                ),
              });
            }
          }}
        />
      ))}
    </div>
  );
};

export default ChooseQuestions;
