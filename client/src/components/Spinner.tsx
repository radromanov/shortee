import { PuffLoader } from "react-spinners";

interface SpinnerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
  size?: number;
  color?: string;
}

const Spinner = ({
  size,
  color = "#ffffff",
  className,
  ...props
}: SpinnerProps) => {
  return (
    <div
      className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ${
        className ?? ""
      }`}
      {...props}
    >
      <PuffLoader color={color} size={size} speedMultiplier={0.5} />
    </div>
  );
};

export default Spinner;
