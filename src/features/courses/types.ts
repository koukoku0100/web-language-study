export type LessonStatus = "published" | "draft" | "private";

export type SelectOption = {
  id: string;
  label: string;
};

export type LessonListItem = {
  id: string;
  orderNumber: number;
  name: string;
  status: LessonStatus;
  selected: boolean;
};

export type LinkedQuestionSet = {
  id: string;
  label: string;
};

export type LessonDraft = {
  lessonName: string;
  videoUrl: string;
  publishStatusId: string;
  displayOrder: string;
  description: string;
  linkedQuestionSets: LinkedQuestionSet[];
};

export type CourseLessonState = {
  screenId: "WELG0120";
  showSampleDataBadge: boolean;
  title: string;
  description: string;
  courseOptions: SelectOption[];
  selectedCourseId: string;
  lessons: LessonListItem[];
  publishStatusOptions: SelectOption[];
  lessonDraft: LessonDraft;
};
