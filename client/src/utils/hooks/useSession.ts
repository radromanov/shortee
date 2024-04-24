import { useEffect } from "react";
import { useAuth } from "./useAuth";

export function useSession() {
  const { data, isAuthed, setUser } = useAuth();

  useEffect(() => {
    const updateAuthStatus = async () => {
      await isAuthed();

      if (data.content?.id) {
        setUser(data.content);
      } else {
        setUser(null);
      }
    };

    updateAuthStatus();
  }, []);

  return data;
}
