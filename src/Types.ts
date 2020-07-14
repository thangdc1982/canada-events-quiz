export type Question = {
  answers: string[];
  incorrect_answers: string[];
  correct_answer: string;  
  question: string;
};

export type QuestionState = Question & {answers: string []};

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}