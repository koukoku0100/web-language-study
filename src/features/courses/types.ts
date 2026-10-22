import type { LessonStatus } from "@/features/lesson-status/lessonStatus";

export type { LessonStatus };

export type CourseOption = {
  id: string;
  courseName: string;
  lessonCount: number;
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
  publishStatusId: LessonStatus;
  displayOrder: number;
  description: string;
  linkedQuestionSets: LinkedQuestionSet[];
};

export type CourseLessonState = {
  screenId: "WELG0120";
  showSampleDataBadge: boolean;
  title: string;
  description: string;
  courseOptions: CourseOption[];
  selectedCourseId: string;
  lessons: LessonListItem[];
  lessonDraft: LessonDraft;
};
