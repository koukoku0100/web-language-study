import { createSlice } from "@reduxjs/toolkit";
import type { AdminShellState } from "./types";

const initialState: AdminShellState = {
  productName: "管理コンソール",
  productDescription: "外国人向け日本語学習アプリ",
  navItems: [
    { screenId: "WELG0110", label: "ダッシュボード" },
    { screenId: "WELG0120", label: "コース・レッスン" },
    { screenId: "WELG0130", label: "問題集" },
    { screenId: "WELG0140", label: "ユーザー" },
    { screenId: "WELG0150", label: "管理者・ロール" },
  ],
  currentAdmin: {
    name: "管理者 A",
    roleLabel: "運営管理者",
    email: "admin@example.com",
  },
};

const adminShellSlice = createSlice({
  name: "adminShell",
  initialState,
  reducers: {},
});

export default adminShellSlice.reducer;
