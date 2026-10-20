import { configureStore } from "@reduxjs/toolkit";
import adminShellReducer from "@/features/admin-shell/adminShellSlice";
import courseLessonReducer from "@/features/courses/courseLessonSlice";
import dashboardReducer from "@/features/dashboard/dashboardSlice";
import loginReducer from "@/features/login/loginSlice";
import questionBankReducer from "@/features/questions/questionBankSlice";
import adminRoleReducer from "@/features/admins/adminRoleSlice";
import learnerAdminReducer from "@/features/users/learnerAdminSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    adminShell: adminShellReducer,
    dashboard: dashboardReducer,
    courseLesson: courseLessonReducer,
    questionBank: questionBankReducer,
    learnerAdmin: learnerAdminReducer,
    adminRole: adminRoleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
