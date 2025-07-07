import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useCallback, useState, type FormEventHandler } from "react";
import ImageWorker from "./image-worker?worker";
import blurImage from "./blurImage";

function App() {
  const [progress, setProgress] = useState(0);
  const [resultImageUrl, setResultImageUrl] = useState<null | string>(null);
  // const [file, setFile] = useState<File | null>(null);

  const mainThread = useCallback(async (file: File) => {
    let interval: null | number = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval!);
          interval = null;
          return p;
        }

        return p + 10;
      });
    }, 500);

    const resultUrl = await blurImage(file);

    if (interval) clearInterval(interval);
    setProgress(0);

    setResultImageUrl(resultUrl);
  }, []);

  const spinUpWorker = useCallback((file: File) => {
    const imageWorker = new ImageWorker();
    imageWorker.postMessage({ file });

    let interval: null | number = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval!);
          interval = null;
          return p;
        }

        return p + 10;
      });
    }, 500);

    imageWorker.addEventListener("message", (e) => {
      if (interval) clearInterval(interval);
      setProgress(0);

      setResultImageUrl(e.data.resultUrl);
    });
  }, []);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback((event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const file = formData.get("image") as File;

    if (!file?.size) return;

    // mainThread(file);
    spinUpWorker(file);
  }, []);

  return (
    <Container style={{ marginTop: 60 }} className="d-flex flex-column">
      <Form onSubmit={onSubmit} className="mb-4">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select image</Form.Label>
          <Form.Control
            disabled={progress > 0}
            name="image"
            accept="image/jpg,image/jpeg,image/png"
            type="file"
          />
        </Form.Group>
        <Button disabled={progress > 0} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {progress > 0 && <ProgressBar now={progress} />}
      {resultImageUrl && <Image src={resultImageUrl} />}
    </Container>
  );
}

export default App;
