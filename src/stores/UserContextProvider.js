"use client";
import React from "react";
import { useUser } from "@/hooks/useUser";

export const UserContext = React.createContext({});

export default function UserContextProvider({ children }) {
  const { user, firstName } = useUser();

  return (
    <UserContext.Provider value={{ user, firstName }}>
      {children}
    </UserContext.Provider>
  );
}
