import { createContext } from "react";
import useProvideAuth from "../hooks/useProvideAuth";
import {
  UserInfoPayload,
  UserLoginPayload,
  UserSession,
} from "../types/User.type";
import { Exception } from "../types/Error.type";

interface AuthContext {
  login: (payload: UserLoginPayload) => Promise<UserSession | null>;
  logout: () => Promise<void>;
  signup: (payload: UserInfoPayload) => Promise<boolean>;

  user: UserSession | null;
  error: Exception | null;
  setUser: React.Dispatch<React.SetStateAction<UserSession | null>>;
  isAuthed(): Promise<UserSession | null>;
  isLoading: "idle" | "loading" | "success" | "fail";
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export function ProvideAuth({ children }: { children: React.JSX.Element }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
