interface Button
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string | JSX.Element;
  isLoading: boolean;
  variant: "default" | "warning";
  className?: string;
}

const Button = ({ variant, isLoading, text, className, ...props }: Button) => {
  let styles =
    className +
    " relative px-3 py-1 rounded-md disabled:cursor-not-allowed disabled:bg-neutral-700 transition-colors ";

  switch (variant) {
    case "warning":
      styles += "bg-red-700 hover:bg-red-600";
      break;
    default:
      styles += "bg-violet-700 hover:bg-violet-600";
      break;
  }

  return (
    <button
      disabled={isLoading}
      className={`${styles} ${className ?? ""} ${
        isLoading ? "cursor-not-allowed" : ""
      }`}
      {...props}
    >
      <p>
        <span>{text}</span>
      </p>
    </button>
  );
};

export default Button;
