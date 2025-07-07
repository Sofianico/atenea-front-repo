import { redirectLogin, redirectLogout } from "@/utils/login";

export const useAuth = () => {
  const login = () => {
    redirectLogin();
  };

  const logout = () => {
    redirectLogout();
  };

  return { login, logout };
};
