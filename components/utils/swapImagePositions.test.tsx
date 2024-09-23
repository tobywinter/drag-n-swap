import { PhotoBookPage } from "../printPage";
import { swapImagePositions } from "./swapImagePositions";

describe("swapImagePositions", () => {
  let data: PhotoBookPage[];
  beforeEach(() => {
    data = [
      { title: "Front Print", images: ["frontPrint"] },
      { title: "Page 1", images: ["image1", "image2"] },
      { title: "Page 2", images: ["image3", "image4"] },
    ];
  });
  it("should swap order in the same page", () => {
    const newData = swapImagePositions(data, "image1", "image2");

    expect(newData).toEqual([
      { title: "Front Print", images: ["frontPrint"] },
      { title: "Page 1", images: ["image2", "image1"] },
      { title: "Page 2", images: ["image3", "image4"] },
    ]);
  });

  it("should swap order between a page with the same number of images", () => {
    const newData = swapImagePositions(data, "image1", "image3");

    expect(newData).toEqual([
      { title: "Front Print", images: ["frontPrint"] },
      { title: "Page 1", images: ["image3", "image2"] },
      { title: "Page 2", images: ["image1", "image4"] },
    ]);
  });

  it("should swap order between a page with a different number of images", () => {
    const newData = swapImagePositions(data, "frontPrint", "image4");

    expect(newData).toEqual([
      { title: "Front Print", images: ["image4"] },
      { title: "Page 1", images: ["image1", "image2"] },
      { title: "Page 2", images: ["image3", "frontPrint"] },
    ]);
  });

  it("should handle multiple swaps", () => {
    let newData: PhotoBookPage[] = [];
    newData = swapImagePositions(data, "frontPrint", "image4");
    newData = swapImagePositions(newData, "image3", "frontPrint");

    expect(newData).toEqual([
      { title: "Front Print", images: ["image4"] },
      { title: "Page 1", images: ["image1", "image2"] },
      { title: "Page 2", images: ["frontPrint", "image3"] },
    ]);
  });
});
