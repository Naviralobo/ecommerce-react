import { create } from "zustand";

type User = {
  email: string;
};

type AuthState = {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
};

const loadUser = (): User | null => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

const saveUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const useAuthStore = create<AuthState>((set) => ({
  user: loadUser(),

  login: (email) => {
    const user = { email };
    saveUser(user);
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
