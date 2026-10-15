"use client";

import { Provider } from "react-redux";
import type { ReactNode } from "react";
import { store } from "@/store/store";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
