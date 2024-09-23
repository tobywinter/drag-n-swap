import { PhotoBookPage } from "../printPage";

export const swapImagePositions = (
  data: PhotoBookPage[],
  imageA: string,
  imageB: string
): PhotoBookPage[] => {
  const pages = data.map((page) => ({
    ...page,
    images: [...page.images],
  }));

  const pageA = findPage(pages, imageA);
  const pageB = findPage(pages, imageB);

  if (pageA && pageB) {
    const indexA = pageA.images.indexOf(imageA);
    const indexB = pageB.images.indexOf(imageB);

    pageA.images[indexA] = imageB;
    pageB.images[indexB] = imageA;
  } else {
    console.error("One or both images were not found.");
  }

  return pages;
};

function findPage(pages: { images: string[]; title: string }[], image: string) {
  return pages.find((obj) => obj.images.includes(image));
}
