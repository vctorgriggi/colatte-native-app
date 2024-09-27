import React from "react";

import { signIn, signUp, signOut } from "@/services/authService";
import { SignIn, SignUp, User as UserType } from "@/types";
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "@/utils/asyncStorage";

interface AuthContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  login: (dto: SignIn) => Promise<void>;
  register: (dto: SignUp) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserType | null>(null);

  React.useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getStorageItem("user");

      if (storedUser) {
        setUser(storedUser);
      }
    };

    loadUser();
  }, []);

  /* sync user with storage */
  React.useEffect(() => {
    const updateStorage = async () => {
      if (user) {
        await setStorageItem("user", user);
      } else {
        await removeStorageItem("user");
      }
    };

    updateStorage();
  }, [user]);

  const login = async (dto: SignIn) => {
    const user = await signIn(dto);
    setStorageItem("user", user);
    setUser(user);
  };

  const register = async (dto: SignUp) => {
    const user = await signUp(dto);
    setStorageItem("user", user);
    setUser(user);
  };

  const logout = async () => {
    await signOut();
    removeStorageItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider.");
  }

  return context;
};
