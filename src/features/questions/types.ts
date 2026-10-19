export type LessonStatus = "published" | "draft" | "private";

export type QuestionFormat = "multiple_choice" | "fill_in_blank";

export type SelectOption = {
  id: string;
  label: string;
};

export type QuestionListItem = {
  id: string;
  prompt: string;
  lessonOrder: number;
  lessonName: string;
  format: QuestionFormat;
  status: LessonStatus;
  updatedOn: string;
  selected: boolean;
};

export type QuestionChoice = {
  id: string;
  text: string;
  selectedAsCorrect: boolean;
};

export type QuestionDraft = {
  questionId: string;
  prompt: string;
  explanation: string;
  choices: QuestionChoice[];
};

export type QuestionBankState = {
  screenId: "WELG0130";
  showSampleDataBadge: boolean;
  title: string;
  description: string;
  courseOptions: SelectOption[];
  selectedCourseId: string;
  formatOptions: SelectOption[];
  selectedFormatId: string;
  statusOptions: SelectOption[];
  selectedStatusId: string;
  questions: QuestionListItem[];
  questionDraft: QuestionDraft;
};
