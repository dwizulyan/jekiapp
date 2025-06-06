import { createContext } from "react";
import type { IProfileContext } from "@/components/types/profile";
import { useContext } from "react";

export const UserContext = createContext<IProfileContext | undefined>(
  undefined
);

export const useUsers = (): IProfileContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
