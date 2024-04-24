import { useEffect } from "react";
import { useAuth } from "./useAuth";

export function useSession() {
  const { isAuthed, user, isLoading } = useAuth();

  useEffect(() => {
    const updateAuthStatus = async () => await isAuthed();

    updateAuthStatus();
  }, []);

  return { user, isLoading };
}
