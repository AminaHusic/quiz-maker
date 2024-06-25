export interface QuestionDto {
  id: number;
  question: string;
  answer: string;
}

export interface QuizDto {
  id: number;
  name: string;
  questions: QuestionDto[];
}
