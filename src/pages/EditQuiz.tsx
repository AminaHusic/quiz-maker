import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";

import { QuestionProps, QuizDataProps } from "../components/AddQuizForm";
import EditQuizForm from "../components/EditQuizForm";
import MainLayout from "../layouts/MainLayout";
import { api } from "../helpers/api";
import { allQuizzes } from "../mockData/allQuizzes";
import { schema } from "../constants/validationSchema";

const EditQuiz = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { id } = useParams();
  const quizResponse = allQuizzes.find((quiz) => quiz.id === Number(id));
  const [quiz, setQuiz] = useState<QuizDataProps>({
    name: quizResponse?.name as string,
    newQuestions: quizResponse?.questions as QuestionProps[],
    existingQuestions: [],
  });

  const editQuiz = useMutation({
    mutationFn: () =>
      api.editQuiz(Number(id), {
        name: quiz.name,
        questions: [...quiz.newQuestions, ...quiz.existingQuestions],
      }),
    onSuccess: () => console.log("success"),
    onError: () => console.log("error"),
  });

  useEffect(() => {
    if (quizResponse)
      setQuiz({
        name: quizResponse?.name,
        newQuestions: quizResponse?.questions,
        existingQuestions: [],
      });
  }, [id]);

  const handleEditQuiz = async (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const errors = await schema.validate({
        name: quiz.name,
        newQuestions: quiz.newQuestions,
      });
      console.log("quiz", quiz);
      setShowAlert(false);
      editQuiz.mutate();
    } catch (e) {
      console.log("error", e);
      setShowAlert(true);
    }
  };

  return (
    <MainLayout>
      <>
        <h1 className="text-2xl text-secondary font-medium mb-4">
          Edit {quiz?.name}
        </h1>
        <p className="text-primary-dark text-md mb-4">
          You can remove questions from quiz, add new question (either choose
          from existing questions or add new)
        </p>

        <EditQuizForm
          handleSubmit={(
            e:
              | React.MouseEvent<HTMLButtonElement>
              | React.FormEvent<HTMLFormElement>
          ) => handleEditQuiz(e)}
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
export default EditQuiz;
