import { create } from "zustand";

type User = {
  email: string;
  password: string;
};

type AuthState = {
  user: User | null;
  users: User[];
  signup: (email: string, password: string) => string | null;
  login: (email: string, password: string) => string | null;
  logout: () => void;
};

const loadUsers = (): User[] => {
  const stored = localStorage.getItem("users");
  return stored ? JSON.parse(stored) : [];
};

const loadUser = (): User | null => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

const saveUsers = (users: User[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const saveUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: loadUser(),
  users: loadUsers(),

  signup: (email, password) => {
    const { users } = get();

    const exists = users.find((u) => u.email === email);
    if (exists) return "User already exists";

    const newUser = { email, password };
    const updatedUsers = [...users, newUser];

    saveUsers(updatedUsers);
    saveUser(newUser);
    set({ users: updatedUsers, user: { email, password } });

    return null;
  },

  login: (email, password) => {
    const { users } = get();

    const user = users.find((u) => u.email === email);

    if (!user) return "User not found";
    if (user.password !== password) return "Invalid password";

    saveUser({ email, password });
    set({ user: { email, password } });

    return null;
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
