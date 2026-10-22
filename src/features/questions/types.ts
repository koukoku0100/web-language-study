import type { CalendarDate } from "@/features/calendar-date/calendarDate";
import type { LessonStatus } from "@/features/lesson-status/lessonStatus";

export type { LessonStatus };

export type QuestionFormat = "multiple_choice" | "fill_in_blank";

export type QuestionStatusFilter = LessonStatus | "all";

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
  updatedOn: CalendarDate;
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
  selectedStatusId: QuestionStatusFilter;
  questions: QuestionListItem[];
  questionDraft: QuestionDraft;
};
