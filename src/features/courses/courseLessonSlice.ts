import { createSlice } from "@reduxjs/toolkit";
import type { CourseLessonState } from "./types";

const initialState: CourseLessonState = {
  screenId: "WELG0120",
  showSampleDataBadge: true,
  title: "コース・レッスン管理",
  description: "レッスンの内容・動画・公開状態を編集します",
  courseOptions: [{ id: "n5", label: "日本語入門 N5（12レッスン）" }],
  selectedCourseId: "n5",
  lessons: [
    { id: "lesson-1", orderNumber: 1, name: "あいさつ", status: "published", selected: false },
    { id: "lesson-2", orderNumber: 2, name: "自己紹介", status: "published", selected: false },
    { id: "lesson-3", orderNumber: 3, name: "買い物のあいさつ", status: "draft", selected: true },
    { id: "lesson-4", orderNumber: 4, name: "数字と値段", status: "draft", selected: false },
    { id: "lesson-5", orderNumber: 5, name: "時間と曜日", status: "private", selected: false },
    { id: "lesson-6", orderNumber: 6, name: "家族の紹介", status: "private", selected: false },
  ],
  publishStatusOptions: [
    { id: "published", label: "公開" },
    { id: "draft", label: "下書き" },
    { id: "private", label: "非公開" },
  ],
  lessonDraft: {
    lessonName: "第3課 買い物のあいさつ",
    videoUrl: "",
    publishStatusId: "draft",
    displayOrder: "3",
    description: "お店でよく使うあいさつと、ていねいな言い方を学びます。",
    linkedQuestionSets: [{ id: "set-3", label: "第3課 確認テスト（5問）" }],
  },
};

const courseLessonSlice = createSlice({
  name: "courseLesson",
  initialState,
  reducers: {},
});

export default courseLessonSlice.reducer;
