import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCallback, type FormEventHandler } from "react";

type Props = {
  onSubmit: (file: File) => void | Promise<void>;
  disabled: boolean;
};

export default function FileUploadForm({ onSubmit, disabled }: Props) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const file = formData.get("image") as File;

      if (!file?.size) return;

      onSubmit(file);
    },
    [onSubmit]
  );

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Select image</Form.Label>
        <Form.Control
          disabled={disabled}
          name="image"
          accept="image/jpg,image/jpeg,image/png"
          type="file"
        />
      </Form.Group>
      <Button disabled={disabled} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
