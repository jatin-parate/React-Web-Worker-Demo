import Image from "react-bootstrap/Image";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useCallback, useState } from "react";
import ImageWorker from "../image-worker?worker";
import FileUploadForm from "./FileUploadForm";
import Shell from "./Shell";
import useProgressBar from "../hooks/useProgressBar";

export default function ImageBlur() {
  const [progress, { triggerProgress, resetProgress }] = useProgressBar();
  const [resultImageUrl, setResultImageUrl] = useState<null | string>(null);

  // useEffect(() => {
  //   triggerProgress();
  // }, []);

  const spinUpWorker = useCallback((file: File) => {
    triggerProgress();

    const imageWorker = new ImageWorker();
    imageWorker.postMessage({ file });

    imageWorker.addEventListener("message", (e) => {
      resetProgress();
      setResultImageUrl(e.data.resultUrl);
    });
  }, []);

  return (
    <Shell>
      <FileUploadForm disabled={progress > 0} onSubmit={spinUpWorker} />
      {progress > 0 && <ProgressBar now={progress} />}
      {resultImageUrl && <Image src={resultImageUrl} />}
    </Shell>
  );
}
