export type MetricCard = {
  id: string;
  label: string;
  valueText: string;
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
  updatedOn: string;
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
