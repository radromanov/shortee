import { createContext } from "react";
import useProvideAuth from "../hooks/useProvideAuth";
import { User, UserLoginInfo } from "../types/User.type";
import { Exception } from "../types/Error.type";

interface AuthContext {
  login: (payload: UserLoginInfo, url?: string) => Promise<boolean>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  error: Exception | null;
  setError: React.Dispatch<React.SetStateAction<Exception | null>>;
  isAuthed(url?: string): Promise<void>;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export function ProvideAuth({ children }: { children: React.JSX.Element }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
