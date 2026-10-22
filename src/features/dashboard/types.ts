import type { CalendarDate } from "@/features/calendar-date/calendarDate";

export type MetricValueKind = "count" | "percent";

export type MetricCard = {
  id: string;
  label: string;
  value: number;
  valueKind: MetricValueKind;
  note: string;
};

export type CourseProgress = {
  id: string;
  courseName: string;
  progressRate: number;
  lessonCount: number;
  activeLearnerCount: number;
};

export type PendingLesson = {
  id: string;
  title: string;
  courseName: string;
  updatedOn: CalendarDate;
  editorName: string;
};

export type DashboardState = {
  screenId: "WELG0110";
  showSampleDataBadge: boolean;
  title: string;
  description: string;
  metrics: MetricCard[];
  courseProgresses: CourseProgress[];
  pendingLessons: PendingLesson[];
};
