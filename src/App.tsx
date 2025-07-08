import Image from "react-bootstrap/Image";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useCallback, useState } from "react";
import ImageWorker from "./image-worker?worker";
import blurImage from "./blurImage";
import FileUploadForm from "./components/FileUploadForm";
import Shell from "./components/Shell";
import useProgressBar from "./hooks/useProgressBar";

function App() {
  const [progress, { triggerProgress, resetProgress }] = useProgressBar();
  const [resultImageUrl, setResultImageUrl] = useState<null | string>(null);

  const mainThread = useCallback(
    async (file: File) => {
      triggerProgress();

      const resultUrl = await blurImage(file);
      setResultImageUrl(resultUrl);

      resetProgress();
    },
    [triggerProgress, resetProgress]
  );

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

export default App;
