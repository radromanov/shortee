import { useState } from "react";
import { ShortURL } from "../utils/types/Url.type";
import { Link } from "react-router-dom";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

interface ShortLinkProps {
  url: ShortURL;
}

const ShortLink = ({ url }: ShortLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex gap-2"
    >
      <Link className="flex items-center justify-center w-full" to={url.short}>
        {url.name}
      </Link>
      {isHovered && (
        <IoEllipsisVerticalSharp
          size={24}
          className="cursor-pointer absolute opacity-70 font-light right-0"
        />
      )}
    </li>
  );
};

export default ShortLink;
