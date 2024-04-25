import { PuffLoader } from "react-spinners";

interface SpinnerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
  size?: number;
  color?: "white" | "purple";
}

const Spinner = ({
  size,
  color = "white",
  className,
  ...props
}: SpinnerProps) => {
  let colorHex;

  switch (color) {
    case "white":
      colorHex = "#ffffff";
      break;
    case "purple":
      colorHex = "#ce36d6";
      break;
    default:
      break;
  }

  return (
    <div
      className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ${
        className ?? ""
      }`}
      {...props}
    >
      <PuffLoader color={colorHex} size={size} speedMultiplier={0.5} />
    </div>
  );
};

export default Spinner;
