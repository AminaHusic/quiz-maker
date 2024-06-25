import { XMarkIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import TextArea from "./TextArea";
import { QuizDataProps } from "./AddQuizForm";

interface QuestionFormProps {
  questionNumber: number;
  quizData: QuizDataProps;
  setQuizData: (value: QuizDataProps) => void;
  removeCard: (e: React.MouseEvent<HTMLOrSVGElement>) => void;
}
const QuestionForm = ({
  questionNumber,
  quizData,
  setQuizData,
  removeCard,
}: QuestionFormProps) => {
  return (
    <div className="w-full border-b border-b-primary p-3 flex flex-col gap-3">
      <div className="flex justify-between">
        <h1 className="text-secondary text-sm font-bold">
          Question {questionNumber}
        </h1>
        <XMarkIcon
          className="w-4 h-4 text-primary hover:text-secondary cursor-pointer"
          onClick={removeCard}
        />
      </div>
      <TextArea
        value={quizData.newQuestions[questionNumber - 1].question}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const questionsArray = quizData.newQuestions;
          questionsArray[questionNumber - 1] = {
            ...questionsArray[questionNumber - 1],
            question: e.target.value,
          };
          setQuizData({ ...quizData, newQuestions: questionsArray });
        }}
        placeholder="Question"
      />
      <Input
        value={quizData.newQuestions[questionNumber - 1].answer}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const questionsArray = quizData.newQuestions;
          questionsArray[questionNumber - 1] = {
            ...questionsArray[questionNumber - 1],
            answer: e.target.value,
          };
          setQuizData({ ...quizData, newQuestions: questionsArray });
        }}
        placeholder="Answer"
      />
    </div>
  );
};
export default QuestionForm;
