"use client";
import CourseContextProvider from "@/features/create-course/stores/CourseContextProvider";
import { PanelsContextProvider } from "@/features/create-course/stores/PanelsContextProvider";

export default function RootLayout({ children }) {
  return (
    <CourseContextProvider>
      <PanelsContextProvider>{children}</PanelsContextProvider>
    </CourseContextProvider>
  );
}
