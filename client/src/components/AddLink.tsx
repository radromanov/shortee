import { useState } from "react";
import Button from "./Button";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddLink = ({ setShowModal }: Props) => {
  const [url, setURL] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    return await fetch("http://localhost:3001/api/v1/short-url", {
      method: "POST",
      body: JSON.stringify({ original: url, name }),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });
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
            value={url}
            onChange={(e) => setURL(e.target.value)}
          />
        </label>
        <label htmlFor="name">
          <p>
            <span>Name</span>
          </p>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <Button value="Add" variant="default" />
        <Button
          value="Close"
          variant="warning"
          onClick={() => setShowModal(false)}
        />
      </form>
    </div>
  );
};

export default AddLink;
