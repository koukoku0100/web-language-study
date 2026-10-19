import { configureStore } from "@reduxjs/toolkit";
import adminShellReducer from "@/features/admin-shell/adminShellSlice";
import dashboardReducer from "@/features/dashboard/dashboardSlice";
import loginReducer from "@/features/login/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    adminShell: adminShellReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
