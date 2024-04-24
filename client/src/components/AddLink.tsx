import { useState } from "react";
import Button from "./Button";

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
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2">
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">
          <p>
            <span>URL</span>
          </p>
          <input
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="name">
          <p>
            <span>Name</span>
          </p>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInput}
          />
        </label>
        <Button text="Add" variant="default" />
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
