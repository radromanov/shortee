import { IoIosCopy } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

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

const ShortLinkOpts = () => {
  const OPTION_ELEMENTS = Object.values(OPTIONS).map((opt) => {
    return { method: opt, icon: assignElement(opt) };
  });
  return (
    <ul className="translate-x-1/2 left-1/3 top-full absolute border border-slate-400 shadow-black shadow-md bg-white text-black rounded-md z-10">
      {OPTION_ELEMENTS.map((option) => (
        <li
          key={option.method}
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
