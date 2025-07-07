import imageJs from "image-js";

export default async function blurImage(file: File) {
  let image = await imageJs.load(await file.arrayBuffer());
  image = image.flipX().blurFilter({ radius: 20 });

  return image.toDataURL();
}
