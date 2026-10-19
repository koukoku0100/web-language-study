import { configureStore } from "@reduxjs/toolkit";
import adminShellReducer from "@/features/admin-shell/adminShellSlice";
import courseLessonReducer from "@/features/courses/courseLessonSlice";
import dashboardReducer from "@/features/dashboard/dashboardSlice";
import loginReducer from "@/features/login/loginSlice";
import questionBankReducer from "@/features/questions/questionBankSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    adminShell: adminShellReducer,
    dashboard: dashboardReducer,
    courseLesson: courseLessonReducer,
    questionBank: questionBankReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
