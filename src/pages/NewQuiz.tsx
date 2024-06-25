import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { QuizDataProps } from "../components/AddQuizForm";
import AddQuizForm from "../components/AddQuizForm";
import MainLayout from "../layouts/MainLayout";
import { api } from "../helpers/api";
import { schema } from "../constants/validationSchema";

const NewQuiz = () => {
  const [quiz, setQuiz] = useState<QuizDataProps>({
    name: "",
    newQuestions: [...Array(3)].fill({ question: "", answer: "" }),
    existingQuestions: [],
  });

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const addQuiz = useMutation({
    mutationFn: () =>
      api.addQuiz({
        name: quiz.name,
        questions: [...quiz.newQuestions, ...quiz.existingQuestions],
      }),
    onSuccess: () => console.log("success"),
    onError: () => console.log("error"),
  });
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const errors = await schema.validate({
        name: quiz.name,
        newQuestions: quiz.newQuestions,
      });
      setShowAlert(false);
      addQuiz.mutate();
    } catch (e) {
      console.log("error", e);
      setShowAlert(true);
    }
  };

  return (
    <MainLayout>
      <>
        <h1 className="text-2xl text-secondary font-medium mb-4">
          Make new quiz
        </h1>
        <p className="text-primary-dark text-md mb-4">
          Make a new quiz with new or exiting questions
        </p>

        <AddQuizForm
          handleSubmit={(
            e:
              | React.MouseEvent<HTMLButtonElement>
              | React.FormEvent<HTMLFormElement>
          ) => handleSubmit(e)}
          quizData={quiz}
          setQuiz={setQuiz}
        />
        {showAlert && (
          <div className="p-3 border border-warning rounded text-warning mt-4">
            Please enter a valid data
          </div>
        )}
      </>
    </MainLayout>
  );
};

export default NewQuiz;
