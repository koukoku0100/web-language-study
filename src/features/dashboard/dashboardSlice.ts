import { createSlice } from "@reduxjs/toolkit";
import type { DashboardState } from "./types";

const initialState: DashboardState = {
  screenId: "WELG0110",
  showSampleDataBadge: true,
  title: "ダッシュボード",
  description: "学習の進み具合とコンテンツの状況を確認します",
  metrics: [
    { id: "registered-users", label: "登録ユーザー数", valueText: "1,248", note: "累計" },
    { id: "weekly-learners", label: "今週の学習ユーザー", valueText: "386", note: "直近7日間" },
    { id: "published-lessons", label: "公開中のレッスン", valueText: "46", note: "下書きは含みません" },
    { id: "average-accuracy", label: "平均正答率", valueText: "74%", note: "全コース・直近30日" },
  ],
  courseProgresses: [
    { id: "n5", courseName: "日本語入門 N5", progressRate: 68, lessonCount: 12, activeLearnerCount: 214 },
    { id: "n4", courseName: "日本語 N4", progressRate: 41, lessonCount: 18, activeLearnerCount: 137 },
    { id: "workplace", courseName: "職場の日本語", progressRate: 29, lessonCount: 10, activeLearnerCount: 96 },
    { id: "pronunciation", courseName: "発音とあいさつ", progressRate: 83, lessonCount: 6, activeLearnerCount: 58 },
  ],
  pendingLessons: [
    {
      id: "pending-1",
      title: "第3課 買い物のあいさつ",
      courseName: "日本語入門 N5",
      updatedOn: "10/12",
      editorName: "編集者 B",
    },
    {
      id: "pending-2",
      title: "第4課 数字と値段",
      courseName: "日本語入門 N5",
      updatedOn: "10/11",
      editorName: "編集者 B",
    },
    {
      id: "pending-3",
      title: "第1課 電話のとり方",
      courseName: "職場の日本語",
      updatedOn: "10/09",
      editorName: "編集者 C",
    },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
});

export default dashboardSlice.reducer;
