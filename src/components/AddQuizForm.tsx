import Button, { ButtonStyles } from "./Button";
import Input from "./Input";
import QuestionForm from "./QuestionForm";
import { PlusIcon } from "@heroicons/react/24/outline";
import ChooseQuestions from "./ChooseQuestions";

export interface QuestionProps {
  id?: number;
  question: string;
  answer: string;
}

export interface QuizDataProps {
  name: string;
  newQuestions: QuestionProps[];
  existingQuestions: QuestionProps[];
}

interface AddQuizFormProps {
  handleSubmit: (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => void;
  quizData: QuizDataProps;
  setQuiz: (value: QuizDataProps) => void;
}

const AddQuizForm = ({ handleSubmit, quizData, setQuiz }: AddQuizFormProps) => {
  const handleAddNewQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setQuiz({
      ...quizData,
      newQuestions: [...quizData.newQuestions, { question: "", answer: "" }],
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <Input
          value={quizData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuiz({ ...quizData, name: e.target.value })
          }
          placeholder="Quiz Name"
        />
        <div className="flex gap-4 justify-between">
          <div className="flex flex-col gap-3 basis-1/2">
            {quizData.newQuestions.map((question, index) => {
              return (
                <QuestionForm
                  key={index}
                  questionNumber={index + 1}
                  quizData={quizData}
                  setQuizData={setQuiz}
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
            <Button
              text={"Add new question"}
              onClick={handleAddNewQuestion}
              buttonStyle={ButtonStyles.textButton}
              icon={<PlusIcon className="w-4 h-4" />}
              iconPlacement="left"
            />
          </div>

          <div className="basis-1/2 flex flex-col">
            <ChooseQuestions
              setQuiz={setQuiz}
              quizData={quizData}
              isNew={true}
            />
          </div>
        </div>
        <Button
          text="Add new quiz"
          buttonStyle={ButtonStyles.mainButtonStyle}
          onClick={handleSubmit}
        ></Button>
      </form>
    </>
  );
};

export default AddQuizForm;
