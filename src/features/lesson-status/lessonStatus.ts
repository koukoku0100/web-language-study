export const LESSON_STATUSES = ["published", "draft", "private"] as const;

export type LessonStatus = (typeof LESSON_STATUSES)[number];

export const LESSON_STATUS_LABEL: Record<LessonStatus, string> = {
  published: "公開",
  draft: "下書き",
  private: "非公開",
};

export function isLessonStatus(value: string): value is LessonStatus {
  return LESSON_STATUSES.some((status) => status === value);
}

export function lessonStatusOptions(exclude: readonly LessonStatus[] = []) {
  return LESSON_STATUSES.filter((status) => !exclude.includes(status)).map((status) => ({
    id: status,
    label: LESSON_STATUS_LABEL[status],
  }));
}
