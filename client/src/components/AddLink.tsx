import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { NameSchema, URLSchema } from "../utils/types/Url.type";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddLink = ({ setShowModal }: Props) => {
  const [formData, setFormData] = useState<{ url: string; name: string }>({
    name: "",
    url: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.length) {
      setFormData((prev) => ({
        ...prev,
        name: prev.url,
      }));
    }

    return await fetch("http://localhost:3001/api/v1/short-url", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.toLowerCase(),
    }));
  };

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2">
      <form onSubmit={handleSubmit}>
        <Input
          id="url"
          name="url"
          text="URL"
          onChange={handleInput}
          value={formData.url}
          schema={URLSchema}
          type="text"
        />

        <Input
          id="name"
          name="name"
          text="name"
          onChange={handleInput}
          value={formData.name}
          schema={NameSchema}
          type="text"
          required={false}
        />

        <Button
          text="Add"
          variant="default"
          onSubmit={() => setShowModal(false)}
        />
        <Button
          text="Close"
          variant="warning"
          onClick={() => setShowModal(false)}
        />
      </form>
    </div>
  );
};

export default AddLink;
