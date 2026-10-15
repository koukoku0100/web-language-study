import { createSlice } from "@reduxjs/toolkit";
import type { LoginState } from "./types";

const initialState: LoginState = {
  screenId: "WELG0010",
  appName: "管理コンソール",
  appDescription: "外国人向け日本語学習アプリ",
  heading: "ログイン",
  emailLabel: "メールアドレス",
  emailPlaceholder: "name@example.com",
  passwordLabel: "パスワード",
  passwordPlaceholder: "パスワードを入力",
  errorMessage: "IDまたはパスワードが正しくありません",
  submitLabel: "ログイン",
  note: "アカウントをお持ちでない場合は、運営管理者にお問い合わせください。",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
});

export default loginSlice.reducer;
