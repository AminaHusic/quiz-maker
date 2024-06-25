import { useMemo } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import Button, { ButtonStyles } from "./Button";
import Input from "./Input";
import QuestionForm from "./QuestionForm";
import ChooseQuestions from "./ChooseQuestions";
import QuestionCard from "./QuestionCard";
import { QuizDataProps } from "./AddQuizForm";

interface EditQuizFormProps {
  handleSubmit: (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => void;
  quizData: QuizDataProps;
  setQuiz: (value: QuizDataProps) => void;
}
const EditQuizForm = ({
  handleSubmit,
  quizData,
  setQuiz,
}: EditQuizFormProps) => {
  const handleAddNewQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setQuiz({
      ...quizData,
      newQuestions: [...quizData.newQuestions, { question: "", answer: "" }],
    });
  };
  const newQuestions = useMemo(() => {
    const newQuestionsData = quizData.newQuestions.filter(
      (question) => !question.id
    );
    return newQuestionsData;
  }, [quizData]);

  const oldQuestionsData = quizData.newQuestions.filter((el) => el.id);

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <Input
          value={quizData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuiz({ ...quizData, name: e.target.value });
          }}
          placeholder="Quiz Name"
          required
        />
        <div className="flex flex-col gap-5">
          {quizData.newQuestions.map((question, index) => {
            if (question.id)
              return (
                <QuestionCard
                  key={`${question.id}-${index}`}
                  questionNumber={index + 1}
                  question={question.question}
                  removeCard={(e: React.MouseEvent<HTMLOrSVGElement>) => {
                    e.stopPropagation();
                    e.preventDefault();
                    const questions = quizData.newQuestions;
                    questions.splice(index, 1);
                    setQuiz({
                      ...quizData,
                      newQuestions: questions,
                    });
                  }}
                />
              );
          })}
        </div>
        <div className="flex justify-between gap-4">
          <div className="basis-1/2 flex flex-col">
            <ChooseQuestions
              setQuiz={setQuiz}
              quizData={quizData}
              isNew={false}
            />
          </div>
          <div className="flex  basis-1/2 flex-col gap-4">
            {newQuestions.map((question, index) => (
              <QuestionForm
                key={index}
                questionNumber={oldQuestionsData.length + index + 1}
                quizData={quizData}
                setQuizData={setQuiz}
                removeCard={(e: React.MouseEvent<HTMLOrSVGElement>) => {
                  e.stopPropagation();
                  e.preventDefault();
                  const questions = quizData.newQuestions;
                  questions.splice(oldQuestionsData.length + index, 1);
                  setQuiz({
                    ...quizData,
                    newQuestions: questions,
                  });
                }}
              />
            ))}
            <Button
              text={"Add new question"}
              onClick={handleAddNewQuestion}
              buttonStyle={ButtonStyles.textButton}
              icon={<PlusIcon className="w-4 h-4" />}
              iconPlacement="left"
            />
          </div>
        </div>

        <Button
          text="Submit changes"
          buttonStyle={ButtonStyles.mainButtonStyle}
          onClick={handleSubmit}
        ></Button>
      </form>
    </>
  );
};

export default EditQuizForm;
