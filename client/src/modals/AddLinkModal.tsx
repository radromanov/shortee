import { createPortal } from "react-dom";
import { ReactNode, useEffect, useRef } from "react";

const mount = document.getElementById("add-link-root") as HTMLElement;

const AddLinkModal = ({ children }: { children: ReactNode }) => {
  // create div element only once using ref
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) elRef.current = document.createElement("div");

  useEffect(() => {
    const el = elRef.current!;

    mount.appendChild(el);
    return () => {
      mount.removeChild(el);
    };
  }, []);

  return createPortal(children, document.body);
};

export default AddLinkModal;
