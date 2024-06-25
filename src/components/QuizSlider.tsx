import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import Button, { ButtonStyles } from "./Button";
import { GetQuestionDto } from "../helpers/api";

type QuestionStateProps = GetQuestionDto & { showAnswer: boolean };
interface QuizSliderProps {
  quizName: string;
  questions: GetQuestionDto[];
}

const QuizSlider = ({ quizName, questions }: QuizSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [questionsData, setQuestionsData] = useState<QuestionStateProps[]>(
    questions
      ? questions.map((item) => {
          return {
            id: item.id,
            question: item.question,
            answer: item.answer,
            showAnswer: false,
          };
        })
      : [{ id: 0, question: "", answer: "", showAnswer: false }]
  );
  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setDirection("left");
      setCurrentSlide(currentSlide - 1);
    }
  };
  const handleNextSlide = () => {
    if (questions && currentSlide < questions?.length - 1) {
      setDirection("right");
      setCurrentSlide(currentSlide + 1);
    }
  };
  return (
    <>
      <section className="mt-7 mb-3 relative md:h-[250px] w-full overflow-hidden shadow-lg h-auto min-h-[250px] max-w-2xl mx-auto">
        {questionsData.map((el, index) => {
          return (
            <Transition
              key={index}
              show={currentSlide === index}
              enter="transform transition ease-in-out duration-500"
              enterFrom={
                direction === "right" ? "translate-x-full" : "-translate-x-full"
              }
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo={
                direction === "right" ? "-translate-x-full" : "translate-x-full"
              }
            >
              <div className="border border-primary   rounded p-3  flex flex-col absolute w-full h-full">
                <p className="text-xs text-secondary text-center font-bold">
                  {quizName}
                </p>
                <p className="text-md text-primary-dark my-3">{el.question}</p>
                {!el.showAnswer && (
                  <Button
                    text="Show answer"
                    onClick={() => {
                      const newData = questionsData.map((item) => {
                        if (item.id === el.id)
                          return { ...item, showAnswer: true };
                        else return item;
                      });
                      setQuestionsData(newData);
                    }}
                    buttonStyle={ButtonStyles.textButton}
                  />
                )}
                <Transition
                  key={index}
                  show={el.showAnswer}
                  enter="transition ease-out duration-500"
                  enterFrom="-translate-y-full"
                  enterTo="translate-y-0"
                  leave="transition ease-in duration-500"
                  leaveFrom="translate-y-0"
                  leaveTo="translate-y-full"
                >
                  <p className="text-md text-primary-light font-semibold text-center mb-0 mt-auto">
                    {el?.answer}
                  </p>
                </Transition>
              </div>
            </Transition>
          );
        })}
      </section>
      <div className="flex gap-4 justify-center mt-4">
        <ChevronLeftIcon
          onClick={handlePrevSlide}
          className={`w-10 h-10 border rounded-full p-2  ${
            currentSlide === 0
              ? "text-gray-light border-gray-light cursor-not-allowed"
              : "text-gray-dark border-primary cursor-pointer hover:border-secondary hover:text-secondary"
          } `}
        />
        <ChevronRightIcon
          onClick={handleNextSlide}
          className={`w-10 h-10 border rounded-full p-2 ${
            questions && currentSlide === questions?.length - 1
              ? "text-gray-light border-gray-light cursor-not-allowed"
              : "text-gray-dark border-primary cursor-pointer hover:border-secondary hover:text-secondary"
          } `}
        />
      </div>
    </>
  );
};
export default QuizSlider;
