import axios, { Axios, AxiosResponse } from "axios";

export class Api {
  apiInstance: Axios;
  constructor() {
    this.apiInstance = axios.create({
      baseURL: "http://quiz-maker.apidocs.enterwell.space/api",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  getQuizzes = (): Promise<AxiosResponse<GetQuizDto[]>> => {
    return this.apiInstance.get("/quizzes");
  };

  getQuiz = (id: number): Promise<AxiosResponse<GetQuizDto>> => {
    return this.apiInstance.get(`/quizzes/${id}`);
  };
  addQuiz = (body: PostQuizDto) => {
    return this.apiInstance.post(`/quizzes`, body);
  };
  editQuiz = (
    id: number,
    body: PostQuizDto
  ): Promise<AxiosResponse<GetQuizDto>> => {
    return this.apiInstance.put(`/quizzes/${id}`, body);
  };
  deleteQuiz = (id: number) => {
    return this.apiInstance.delete(`/quizzes/${id}`);
  };

  getQuestions = (): Promise<AxiosResponse<GetQuestionDto[]>> => {
    return this.apiInstance.get("/questions");
  };
}

export const api = new Api();
export type GetQuestionDto = {
  id: number;
  question: string;
  answer: string;
};
export type GetQuizDto = {
  id: number;
  name: string;
  questions: GetQuestionDto[];
};
type PostQuestionDto = {
  id?: number;
  question: string;
  answer: string;
};
type PostQuizDto = {
  name: string;
  questions: PostQuestionDto[];
};
