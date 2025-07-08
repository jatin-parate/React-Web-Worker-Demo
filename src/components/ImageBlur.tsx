import Image from "react-bootstrap/Image";
import ProgressBar from "react-bootstrap/ProgressBar";
import { memo, useCallback, useEffect, useState } from "react";
import blurImage from "../blurImage";
import FileUploadForm from "./FileUploadForm";
import Shell from "./Shell";
import useProgressBar from "../hooks/useProgressBar";

export default memo(function ImageBlur() {
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

  return (
    <Shell>
      <FileUploadForm disabled={progress > 0} onSubmit={mainThread} />
      {progress > 0 && <ProgressBar now={progress} />}
      {resultImageUrl && <Image src={resultImageUrl} />}
    </Shell>
  );
});
