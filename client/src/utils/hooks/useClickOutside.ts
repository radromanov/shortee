import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLUListElement>(
  callback: () => void
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent | TouchEvent | KeyboardEvent
    ) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }

      if (event instanceof KeyboardEvent && event.key === "Escape") {
        callback();
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);
    document.addEventListener("keydown", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
      document.removeEventListener("keyup", handleClickOutside);
    };
  }, [callback]);

  return ref;
};
