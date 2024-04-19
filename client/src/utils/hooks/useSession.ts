import { useEffect } from "react";
import { useAuth } from "./useAuth";

export function useSession() {
  const { user, isAuthed } = useAuth();

  useEffect(() => {
    const fetchIsAuthed = async () => await isAuthed();
    fetchIsAuthed();
  }, []);

  return user;
}
