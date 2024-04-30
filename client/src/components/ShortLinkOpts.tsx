import { IoIosCopy } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useClickOutside } from "../utils/hooks/useClickOutside";
import copyShortLink from "../utils/helpers/copyShortLink";
import editShortLink from "../utils/helpers/editShortLink";
import deleteShortLink from "../utils/helpers/deleteShortLink";
import { ShortURL } from "../utils/types/Url.type";

interface Props {
  url: ShortURL;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const OPTIONS = { COPY: "Copy", EDIT: "Edit", DELETE: "Delete" } as const;

const assignElement = (method: (typeof OPTIONS)[keyof typeof OPTIONS]) => {
  let element: React.ReactNode;

  switch (method) {
    case "Copy":
      element = <IoIosCopy />;
      break;
    case "Edit":
      element = <FiEdit3 />;
      break;
    case "Delete":
      element = <RiDeleteBinLine />;
      break;
  }

  return element;
};

const ShortLinkOpts = ({ url, setIsClicked }: Props) => {
  const OPTION_ELEMENTS = Object.values(OPTIONS).map((opt) => {
    return { method: opt, icon: assignElement(opt) };
  });

  const element = useClickOutside(() => setIsClicked(false));

  const handleClickedMethod = async (e: React.MouseEvent) => {
    const method = e.currentTarget
      .ariaLabel as (typeof OPTIONS)[keyof typeof OPTIONS];

    switch (method) {
      case "Copy":
        await copyShortLink(url.short);
        break;

      case "Edit":
        editShortLink();
        break;

      case "Delete":
        deleteShortLink();
        break;
    }

    setIsClicked(false);
  };

  return (
    <ul
      ref={element}
      className="translate-x-1/2 left-1/3 top-full absolute border border-slate-400 shadow-black shadow-md bg-white text-black rounded-md z-10"
    >
      {OPTION_ELEMENTS.map((option) => (
        <li
          aria-label={option.method}
          key={option.method}
          onClick={handleClickedMethod}
          className="cursor-pointer flex items-center justify-between gap-4 hover:bg-slate-300 px-2 py-2 rounded-md"
        >
          <p>
            <span>{option.method}</span>
          </p>
          <p>
            <span>{option.icon}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ShortLinkOpts;
