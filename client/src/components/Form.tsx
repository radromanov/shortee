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
      className={`${
        className ?? ""
      } bg-neutral-800 rounded-md px-4 py-2 flex flex-col w-5/12 text-sm 
      sm:w-4/12 sm:text-sm
      md:w-4/12 md:text-sm 
      lg:w-3/12 lg:text-sm 
      xl:w-3/12 xl:text-sm
      2xl:w-2/12 2xl:text-sm`}
      {...props}
    >
      <div className="flex flex-col gap-8">{children}</div>
      {error?.message && (
        <p>
          <span className="text-red-500">{error.message}</span>
        </p>
      )}
    </form>
  );
};

export default Form;
