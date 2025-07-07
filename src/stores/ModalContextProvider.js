"use client";
import React from "react";
import { useModal } from "@/hooks/useModal";

export const ModalContext = React.createContext({});

export default function ModalContextProvider({ children }) {
  const { component, props, isOpen, open, close } = useModal();

  return (
    <ModalContext.Provider value={{ component, props, isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}
