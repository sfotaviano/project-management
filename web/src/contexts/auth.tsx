import React, { createContext, useContext, useEffect, useState } from "react";

import * as auth from "../services/auth";
import type { IUser } from "../interfaces/user";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  token: string | null;
  user: IUser | null;
  login(username: string, password: string): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function persistSession(user: IUser, token: string) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    setUser(user);
    setToken(token);
  }

  async function login(username: string, password: string) {
    const response = await auth.login(username, password);
    persistSession(response.user, response.token);
  }

  async function logout() {
    localStorage.deleteItem("token");
    localStorage.deleteItem("user");
    setToken(null);
    setUser(null);
  }

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = localStorage.getItem("user");
      const storagedToken = localStorage.getItem("token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setToken(storagedToken);
      }
    }

    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}

export default AuthContext;
