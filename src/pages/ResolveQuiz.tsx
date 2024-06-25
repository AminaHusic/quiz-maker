import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../helpers/api";
import { allQuizzes } from "../mockData/allQuizzes";
import MainLayout from "../layouts/MainLayout";
import QuizSlider from "../components/QuizSlider";
import Loading from "../components/Loading";

const ResolveQuiz = () => {
  const { id } = useParams();
  const mockQuizData = allQuizzes.find((el) => {
    return el.id === Number(id);
  });

  const quizData = useQuery({
    queryKey: ["quiz-by-id"],
    queryFn: () => api.getQuiz(Number(id)),
  });

  return (
    <MainLayout>
      {mockQuizData ? (
        <QuizSlider
          quizName={mockQuizData?.name as string}
          questions={mockQuizData?.questions}
        />
      ) : (
        <Loading />
      )}
    </MainLayout>
  );
};

export default ResolveQuiz;
