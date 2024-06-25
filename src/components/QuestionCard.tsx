import { XMarkIcon } from "@heroicons/react/24/outline";

interface QuestionCardProps {
  questionNumber: number;
  question: string;
  removeCard: (e: React.MouseEvent<HTMLOrSVGElement>) => void;
}
const QuestionCard = ({
  questionNumber,
  question,
  removeCard,
}: QuestionCardProps) => {
  return (
    <div className="w-full border border-primary p-3 hover:shadow-lg hover:border-primary-dark rounded flex flex-col gap-3 bg-white">
      <div className="flex justify-between">
        <h1 className="text-secondary text-sm font-bold">
          Question {questionNumber}
        </h1>
        <XMarkIcon
          className="w-4 h-4 text-primary hover:text-secondary cursor-pointer"
          onClick={removeCard}
        />
      </div>
      <p>{question}</p>
    </div>
  );
};
export default QuestionCard;
