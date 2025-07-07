"use client";
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const TranslationContext = React.createContext({});

export default function TranslationContextProvider({ children }) {
  const { t } = useTranslation();

  return (
    <TranslationContext.Provider value={{ t }}>
      {children}
    </TranslationContext.Provider>
  );
}
