import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  elementId: string;
  children: React.ReactNode;
}

const Modal = ({ elementId, children }: Props) => {
  const mount = document.getElementById(elementId) as HTMLElement;
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

export default Modal;
