import { PhotoBookPage } from "../printPage";

export const swapImagePositions = (
  data: PhotoBookPage[],
  imageA: string,
  imageB: string
): PhotoBookPage[] => {
  const newData = data.map((page) => ({
    ...page,
    images: [...page.images],
  }));

  const pageA = newData.find((obj) => obj.images.includes(imageA));
  const pageB = newData.find((obj) => obj.images.includes(imageB));

  if (pageA && pageB) {
    const indexA = pageA.images.indexOf(imageA);
    const indexB = pageB.images.indexOf(imageB);

    pageA.images[indexA] = imageB;
    pageB.images[indexB] = imageA;
  } else {
    console.error("One or both images were not found.");
  }

  return newData;
};
