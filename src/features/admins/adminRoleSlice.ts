import { createSlice } from "@reduxjs/toolkit";
import type { AdminRoleState } from "./types";

const initialState: AdminRoleState = {
  screenId: "WELG0150",
  showSampleDataBadge: true,
  title: "管理者・ロール管理",
  description: "管理画面を使う人と、ロールごとに許可する操作を設定します",
  permissionHeading: "ロール別の権限（案）",
  permissionNote: "3ロールを想定した案です。実際の権限は、運用の確認後に確定します。",
  accountHeading: "管理者アカウント",
  roleColumns: [
    { id: "owner", name: "運営管理者" },
    { id: "editor", name: "コンテンツ編集者" },
    { id: "viewer", name: "閲覧者" },
  ],
  permissionRows: [
    {
      id: "edit-course",
      actionLabel: "コース・レッスンの登録・編集",
      cells: [
        { roleId: "owner", value: "allowed" },
        { roleId: "editor", value: "allowed" },
        { roleId: "viewer", value: "denied" },
      ],
    },
    {
      id: "publish-course",
      actionLabel: "コース・レッスンの公開／非公開",
      cells: [
        { roleId: "owner", value: "allowed" },
        { roleId: "editor", value: "denied" },
        { roleId: "viewer", value: "denied" },
      ],
    },
    {
      id: "edit-question",
      actionLabel: "問題集の登録・編集",
      cells: [
        { roleId: "owner", value: "allowed" },
        { roleId: "editor", value: "allowed" },
        { roleId: "viewer", value: "denied" },
      ],
    },
    {
      id: "import-question",
      actionLabel: "問題のCSV一括登録",
      cells: [
        { roleId: "owner", value: "allowed" },
        { roleId: "editor", value: "allowed" },
        { roleId: "viewer", value: "denied" },
      ],
    },
    {
      id: "view-user",
      actionLabel: "ユーザー情報の閲覧",
      cells: [
        { roleId: "owner", value: "allowed" },
        { roleId: "editor", value: "denied" },
        { roleId: "viewer", value: "allowed" },
      ],
    },
    {
      id: "suspend-user",
      actionLabel: "ユーザーの利用停止",
      cells: [
        { roleId: "owner", value: "allowed" },
        { roleId: "editor", value: "denied" },
        { roleId: "viewer", value: "denied" },
      ],
    },
    {
      id: "view-progress",
      actionLabel: "学習進捗の閲覧",
      cells: [
        { roleId: "owner", value: "allowed" },
        { roleId: "editor", value: "allowed" },
        { roleId: "viewer", value: "allowed" },
      ],
    },
    {
      id: "manage-admin",
      actionLabel: "管理者アカウント・ロールの管理",
      cells: [
        { roleId: "owner", value: "allowed" },
        { roleId: "editor", value: "denied" },
        { roleId: "viewer", value: "denied" },
      ],
    },
  ],
  accounts: [
    {
      id: "admin-a",
      name: "管理者 A",
      email: "admin@example.com",
      roleName: "運営管理者",
      status: "active",
    },
    {
      id: "editor-b",
      name: "編集者 B",
      email: "editor-b@example.com",
      roleName: "コンテンツ編集者",
      status: "active",
    },
    {
      id: "editor-c",
      name: "編集者 C",
      email: "editor-c@example.com",
      roleName: "コンテンツ編集者",
      status: "active",
    },
    {
      id: "support-d",
      name: "サポート D",
      email: "support-d@example.com",
      roleName: "閲覧者",
      status: "suspended",
    },
  ],
};

const adminRoleSlice = createSlice({
  name: "adminRole",
  initialState,
  reducers: {},
});

export default adminRoleSlice.reducer;
