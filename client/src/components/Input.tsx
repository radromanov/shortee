import { useState } from "react";
import { z } from "zod";
import { generateNameAndLabel } from "../utils/helpers/generateNameAndLabel";

interface Props<T>
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  text: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  schema: z.ZodSchema<T>;
}

function Input<T>({
  text,
  type,
  value,
  onChange,
  className,
  disabled,
  required = true,
  autoFocus = false,
  schema,
  ...props
}: Props<T>) {
  const { name, label } = generateNameAndLabel(text);
  const [error, setError] = useState<string | null>(null);

  function validate(e: React.FocusEvent<HTMLInputElement, Element>) {
    e.preventDefault();

    const input = schema.safeParse(e.target.value);
    if (!input.success) {
      setError(input.error.issues[0].message);
    } else {
      setError(null);
    }
  }

  return (
    <label className="flex flex-col" htmlFor={name}>
      <p>
        <span className="font-semibold">{label}</span>
      </p>
      <input
        className={`w-full border rounded-md px-3 py-1 bg-slate-200 text-black text-md lg:px-4 lg:py-2 ${
          className ?? ""
        } ${disabled ? "cursor-not-allowed hover:bg-gray-400" : ""} ${
          error ? "border-red-600" : "border-black"
        }`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
        onBlur={validate}
        {...props}
      />
      {error ? (
        <p className="flex justify-center text-center">
          <span className="text-red-400 text-md">{error}</span>
        </p>
      ) : (
        <></>
      )}
    </label>
  );
}

export default Input;
