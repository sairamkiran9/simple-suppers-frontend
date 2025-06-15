export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  photoURL?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}