import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { NameSchema, ShortURL, URLSchema } from "../utils/types/Url.type";
import Form from "./Form";

interface Props {
  modal: {
    isOpen: boolean;
    form: "Add" | "Edit";
    url: ShortURL | null;
  };
  setModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      form: "Add" | "Edit";
      url: ShortURL | null;
    }>
  >;
}

const LinkForm = ({ modal, setModal }: Props) => {
  const [formData, setFormData] = useState<{ url: string; name: string }>({
    name: modal.url?.name ?? "",
    url: modal.url?.url ?? "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.length) {
      setFormData((prev) => ({
        ...prev,
        name: prev.url,
      }));
    }

    let payload;

    switch (modal.form) {
      case "Add":
        payload = formData;
        break;

      case "Edit":
        payload = {
          ...formData,
          id: modal.url?.id,
        };
        break;
    }

    return await fetch("http://localhost:3001/api/v1/short-url", {
      method: modal.form === "Add" ? "POST" : "PUT",
      body: JSON.stringify(payload),
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
      [e.target.name]:
        e.target.name === "url" ? e.target.value.toLowerCase() : e.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-center h-full w-full absolute top-0 left-1/2 -translate-x-1/2">
      <Form
        id={modal.form.toLowerCase() + "-link-form"}
        error={null}
        onSubmit={handleSubmit}
      >
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
          text={modal.form === "Add" ? "Add" : "Save"}
          variant="default"
          onSubmit={() =>
            setModal((prev) => ({
              ...prev,
              isOpen: false,
            }))
          }
        />
        <Button
          text="Close"
          variant="warning"
          onClick={() =>
            setModal((prev) => ({
              ...prev,
              isOpen: false,
            }))
          }
        />
      </Form>
    </div>
  );
};

export default LinkForm;
