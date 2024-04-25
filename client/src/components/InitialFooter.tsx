import { Link } from "react-router-dom";
import { toDashcase } from "../utils/helpers/toDashcase";
import { capitalize } from "../utils/helpers/capitalize";

interface FooterProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  link: string;
  children: React.ReactNode;
}

const InitialFooter = ({ link, children, ...props }: FooterProps) => {
  return (
    <footer
      className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-1/2"
      {...props}
    >
      <p>
        <span>
          {children}{" "}
          <Link
            className="underline text-violet-300"
            to={`/${toDashcase(link)}`}
          >
            {capitalize(link)}
          </Link>
        </span>
      </p>
    </footer>
  );
};

export default InitialFooter;
