import Button, { ButtonStyles } from "../components/Button";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Table from "../components/Table";
import { allQuizzes, allQuizzesColumnsData } from "../mockData/allQuizzes";
import { useMemo, useState } from "react";
import Modal from "../components/Modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../helpers/api";
import MainLayout from "../layouts/MainLayout";

const AllQuizzes = () => {
  const navigate = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState<{
    isOpen: boolean;
    quizId: number;
    quizName: string;
  }>({ isOpen: false, quizId: 0, quizName: "" });

  const allQuizzesTableData = allQuizzes.map((quiz) => {
    return {
      id: quiz.id,
      name: quiz.name,
      actions: (
        <div className="flex gap-4 items-center justify-end">
          <TrashIcon
            className="w-4 h-4 text-warning cursor-pointer"
            onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => {
              e.stopPropagation();
              setOpenDeleteModal({
                isOpen: true,
                quizId: quiz.id,
                quizName: quiz.name,
              });
            }}
          />
          <ArrowRightCircleIcon
            className="w-5 h-5 text-primary-light cursor-pointer"
            onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => {
              e.stopPropagation();
              navigate(`/${quiz.id}`);
            }}
          />
        </div>
      ),
    };
  });

  const { data: allQuizzesData, isFetching: isAllQuizzesDataFetching } =
    useQuery({
      queryKey: ["all-quizzes"],
      queryFn: () => api.getQuizzes(),
    });

  const tableData = useMemo(() => {
    if (!isAllQuizzesDataFetching) {
      const data = allQuizzesData?.data.map((quiz) => {
        return {
          id: quiz.id,
          name: quiz.name,
          actions: (
            <div className="flex gap-4 items-center justify-end">
              <TrashIcon
                className="w-4 h-4 text-warning cursor-pointer"
                onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => {
                  e.stopPropagation();
                  setOpenDeleteModal({
                    isOpen: true,
                    quizId: quiz.id,
                    quizName: quiz.name,
                  });
                }}
              />
              <ArrowRightCircleIcon
                className="w-5 h-5 text-primary-light cursor-pointer"
                onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => {
                  e.stopPropagation();
                  navigate(`/${quiz.id}`);
                }}
              />
            </div>
          ),
        };
      });
    }
  }, [isAllQuizzesDataFetching]);

  const handleCloseModal = () => {
    setOpenDeleteModal({ isOpen: false, quizId: 0, quizName: "" });
  };

  const deleteQuiz = useMutation({
    mutationFn: () => api.deleteQuiz(openDeleteModal.quizId),
    onSuccess: () => console.log("success"),
    onError: () => console.log("error"),
  });
  const handleDeleteQuiz = () => {
    deleteQuiz.mutate();
  };

  return (
    <MainLayout>
      <>
        <div className="flex justify-between mb-4 py-3">
          <h1 className="text-2xl font-bold text-secondary">All quizzes</h1>
          <Button
            text="Add new"
            onClick={() => navigate("/new-quiz")}
            buttonStyle={ButtonStyles.mainButtonStyle}
            icon={<PlusIcon className="w-4 h-4" />}
            iconPlacement="left"
          />
        </div>
        <Table
          columns={allQuizzesColumnsData}
          data={allQuizzesTableData}
          onRowClick={navigate}
        />

        {openDeleteModal.isOpen && (
          <Modal
            title={`Delete ${openDeleteModal.quizName}`}
            children={
              <p className="text-gray-dark">
                Are you sure you want to delete {openDeleteModal.quizName}?
              </p>
            }
            onClose={handleCloseModal}
            show={openDeleteModal.isOpen}
            actions={
              <>
                <Button
                  text="Delete"
                  buttonStyle={ButtonStyles.warningButtonStyle}
                  onClick={handleDeleteQuiz}
                />
                <Button
                  text="Cancel"
                  buttonStyle={ButtonStyles.transparentButtonStyle}
                  onClick={handleCloseModal}
                />
              </>
            }
          />
        )}
      </>
    </MainLayout>
  );
};

export default AllQuizzes;
