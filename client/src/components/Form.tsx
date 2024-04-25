import { Exception } from "../utils/types/Error.type";

interface FormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  id: string;
  error: Exception | null;
  className?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}

const Form = ({
  id,
  error,
  className,
  onSubmit,
  children,
  ...props
}: FormProps) => {
  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className={`flex flex-col w-3/12 gap-4 ${className ?? ""}`}
      {...props}
    >
      <div className="flex flex-col gap-2">{children}</div>
      {error?.message && (
        <p>
          <span className="text-red-500">{error.message}</span>
        </p>
      )}
    </form>
  );
};

export default Form;
