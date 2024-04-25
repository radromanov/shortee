import { useEffect } from "react";
import { useAuth } from "./useAuth";

export function useSession() {
  const { isAuthed, user, isLoading, guest } = useAuth();

  useEffect(() => {
    const updateAuthStatus = async () => await isAuthed();

    updateAuthStatus();
  }, [user]);

  return { user, isLoading, guest };
}
