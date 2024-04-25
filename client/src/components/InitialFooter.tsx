import { Link } from "react-router-dom";
import { toDashcase } from "../utils/helpers/toDashcase";
import { capitalize } from "../utils/helpers/capitalize";

interface FooterProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  linkText: string;
  children: React.ReactNode;
}

const InitialFooter = ({ linkText, children, ...props }: FooterProps) => {
  const formattedLink = `/${toDashcase(linkText)}`;
  const displayText = capitalize(linkText);

  return (
    <footer
      className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-1/2"
      {...props}
    >
      <p>
        <span>
          {children}{" "}
          <Link className="underline text-violet-300" to={formattedLink}>
            {displayText}
          </Link>
        </span>
      </p>
    </footer>
  );
};

export default InitialFooter;
