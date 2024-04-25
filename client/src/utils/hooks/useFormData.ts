import { useState } from "react";

export const useFormData = <T>(initialValues: T) => {
  const [formData, setFormData] = useState<T>(initialValues);

  // const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();

  //     const success = await login(formData);

  //     if (success) {
  //       setFormData({ email: "", password: "" });
  //     }
  //   };

  //   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     }));
  //   };

  return { formData, setFormData };
};
