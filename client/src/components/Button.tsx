interface Button
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  value: string;
  variant: "default" | "warning";
  className?: string;
}

const Button = ({ variant, value, className, ...props }: Button) => {
  let styles = className + " px-3 py-1 rounded-md ";

  switch (variant) {
    case "warning":
      styles += "bg-red-700 hover:bg-red-600";
      break;
    default:
      styles += "bg-violet-700 hover:bg-violet-600";
      break;
  }

  return (
    <button className={styles} {...props}>
      {value}
    </button>
  );
};

export default Button;
