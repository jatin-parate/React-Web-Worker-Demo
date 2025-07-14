import blurImage from "./blurImage";

export type ImageWorkerData = { file: File }

self.addEventListener("message", async (event) => {
  const file = event.data.file as File;
  self.postMessage({ resultUrl: await blurImage(file) });
});
