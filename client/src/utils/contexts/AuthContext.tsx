import { createContext } from "react";
import useProvideAuth from "../hooks/useProvideAuth";
import {
  UserInfoPayload,
  UserLoginPayload,
  UserSession,
} from "../types/User.type";
import { State } from "../hooks/useFetch";

interface AuthContext {
  login: (payload: UserLoginPayload) => Promise<State<UserSession>>;
  logout: () => Promise<State<UserSession>>;
  signup: (payload: UserInfoPayload) => Promise<State<UserSession>>;

  data: State<UserSession>;
  user: UserSession | null;
  setUser: React.Dispatch<React.SetStateAction<UserSession | null>>;
  isAuthed(url?: string): Promise<void>;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export function ProvideAuth({ children }: { children: React.JSX.Element }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
