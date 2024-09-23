import { PhotoBookPage } from "../printPage";

export const swapImagePositions = (
  data: PhotoBookPage[],
  imageA: string,
  imageB: string
): PhotoBookPage[] => {
  // Make a deep copy of the data to avoid mutating the original array
  const newData = data.map((page) => ({
    ...page,
    images: [...page.images],
  }));

  // Find the pages containing the images
  const pageA = newData.find((obj) => obj.images.includes(imageA));
  const pageB = newData.find((obj) => obj.images.includes(imageB));

  if (pageA && pageB) {
    // Find the indices of the images within their respective pages
    const indexA = pageA.images.indexOf(imageA);
    const indexB = pageB.images.indexOf(imageB);

    // Swap the images within their respective pages
    pageA.images[indexA] = imageB;
    pageB.images[indexB] = imageA;
  } else {
    console.error("One or both images were not found.");
  }

  return newData;
};
