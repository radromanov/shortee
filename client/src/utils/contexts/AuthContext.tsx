import { createContext } from "react";
import useProvideAuth from "../hooks/useProvideAuth";

interface AuthContext {
  login: (
    payload: { email: string; password: string },
    url?: string
  ) => Promise<boolean>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: { id: string; email: string; username: string } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      email: string;
      username: string;
    } | null>
  >;
  error: string | null;
  setError: React.Dispatch<string | null>;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export function ProvideAuth({ children }: { children: React.JSX.Element }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
