// 질문 타입 정의
export type QuestionType = 'single' | 'multiple' | 'text' | 'rating' | 'yesno';

// 질문 인터페이스
export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  required: boolean;
  options?: string[]; // single, multiple 타입에서 사용
  maxRating?: number; // rating 타입에서 사용 (기본값: 5)
}

// 응답 인터페이스
export interface Answer {
  questionId: string;
  value: string | string[] | number | boolean;
}

// 설문조사 인터페이스
export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

// 설문조사 결과 인터페이스
export interface SurveyResult {
  surveyId: string;
  answers: Answer[];
  completedAt: Date;
}
