import React from "react";
import { usePanel } from "../hooks/usePanel";

export const PanelsContext = React.createContext({});

export const PanelsContextProvider = ({ children }) => {
  const { open: leftOpen, toggle: leftToggle } = usePanel();
  const { open: rightOpen, toggle: rightToggle } = usePanel();

  return (
    <PanelsContext.Provider
      value={{
        leftOpen,
        rightOpen,
        leftToggle,
        rightToggle,
      }}
    >
      {children}
    </PanelsContext.Provider>
  );
};
