import { createSlice } from "@reduxjs/toolkit";
import type { QuestionBankState } from "./types";

const blank = "（\u3000）";

const initialState: QuestionBankState = {
  screenId: "WELG0130",
  showSampleDataBadge: true,
  title: "問題集管理",
  description: "問題の登録・編集と、CSVでの一括登録を行います",
  courseOptions: [{ id: "n5", label: "日本語入門 N5" }],
  selectedCourseId: "n5",
  formatOptions: [{ id: "all", label: "すべて" }],
  selectedFormatId: "all",
  selectedStatusId: "all",
  questions: [
    {
      id: "Q-0101",
      prompt: "「おはようございます」はいつ使いますか。",
      lessonOrder: 1,
      lessonName: "あいさつ",
      format: "multiple_choice",
      status: "published",
      updatedOn: { year: 2026, month: 10, day: 9 },
      selected: false,
    },
    {
      id: "Q-0102",
      prompt: "「ありがとう」の意味はどれですか。",
      lessonOrder: 1,
      lessonName: "あいさつ",
      format: "multiple_choice",
      status: "published",
      updatedOn: { year: 2026, month: 10, day: 9 },
      selected: false,
    },
    {
      id: "Q-0103",
      prompt: `${blank}に入ることばを選んでください。わたしは 学生${blank}。`,
      lessonOrder: 2,
      lessonName: "自己紹介",
      format: "fill_in_blank",
      status: "published",
      updatedOn: { year: 2026, month: 10, day: 10 },
      selected: true,
    },
    {
      id: "Q-0104",
      prompt: "「はじめまして」のあとに言うことばはどれですか。",
      lessonOrder: 2,
      lessonName: "自己紹介",
      format: "multiple_choice",
      status: "draft",
      updatedOn: { year: 2026, month: 10, day: 11 },
      selected: false,
    },
    {
      id: "Q-0105",
      prompt: "お店で値段をたずねるときの言い方はどれですか。",
      lessonOrder: 3,
      lessonName: "買い物のあいさつ",
      format: "multiple_choice",
      status: "draft",
      updatedOn: { year: 2026, month: 10, day: 12 },
      selected: false,
    },
    {
      id: "Q-0106",
      prompt: "「いらっしゃいませ」はだれが言いますか。",
      lessonOrder: 3,
      lessonName: "買い物のあいさつ",
      format: "multiple_choice",
      status: "draft",
      updatedOn: { year: 2026, month: 10, day: 12 },
      selected: false,
    },
  ],
  questionDraft: {
    questionId: "Q-0103",
    prompt: `${blank}に入ることばを選んでください。わたしは 学生${blank}。`,
    explanation: "「〜は〜です」の文では、名詞のあとに「です」を使います。",
    choices: [
      { id: "A", text: "です", selectedAsCorrect: true },
      { id: "B", text: "ます", selectedAsCorrect: false },
      { id: "C", text: "でした", selectedAsCorrect: false },
      { id: "D", text: "ません", selectedAsCorrect: false },
    ],
  },
};

const questionBankSlice = createSlice({
  name: "questionBank",
  initialState,
  reducers: {},
});

export default questionBankSlice.reducer;
