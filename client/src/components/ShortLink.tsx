import { useState } from "react";
import { ShortURL } from "../utils/types/Url.type";
import { Link } from "react-router-dom";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import ShortLinkOpts from "./ShortLinkOpts";

interface ShortLinkProps {
  url: ShortURL;
}

const ShortLink = ({ url }: ShortLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        // If mouse leaves and menu is not clicked...
        if (!isClicked) {
          setIsHovered(false);
        }
      }}
      className="relative flex gap-2"
    >
      <Link className="flex items-center justify-center w-full" to={url.short}>
        {url.name}
      </Link>
      {isHovered && (
        <>
          <IoEllipsisVerticalSharp
            onClick={() => {
              setIsClicked((prev) => !prev);
              setIsHovered(true);
            }}
            size={24}
            className="cursor-pointer absolute opacity-70 font-light right-0"
          />
        </>
      )}
      {isClicked && <ShortLinkOpts url={url} setIsClicked={setIsClicked} />}
    </li>
  );
};

export default ShortLink;
