import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { centerUnderPointer } from "@atlaskit/pragmatic-drag-and-drop/element/center-under-pointer";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

import styled from "styled-components";
import invariant from "tiny-invariant";
import { PhotoBookPage } from "./printPage";
import { swapImagePositions } from "./utils/swapImagePositions";

const Photo = styled.img<{
  $dragging: boolean;
}>`
  opacity: 1;

  /* Styles when dragging */
  ${(props) =>
    props.$dragging &&
    `
      transition: opacity 0.8s;
      opacity: 0.5;
    `}
`;
const PhotoDragPreview = styled.img`
  width: 90px;
  height: 90px;
  opacity: 1;
  border-radius: 50%;
  border: 5px solid white;
`;

interface PhotoProps {
  image: string;
  photoBookData: PhotoBookPage[];
  setPhotoBookData: (data: PhotoBookPage[]) => void;
  alt?: string;
}
export function DraggablePhoto({
  image,
  photoBookData,
  setPhotoBookData,
  alt,
}: PhotoProps) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [preview, setPreview] = useState<HTMLElement>();

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ type: "image", imageSrc: image }),
        onDragStart(): void {
          console.log("onDragStart", { type: "image", imageSrc: image });
          setDragging(true);
        },
        onDrop(): void {
          setDragging(false);
          setPreview(null);
        },
        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          setCustomNativeDragPreview({
            getOffset: centerUnderPointer,
            render({ container }) {
              setPreview(container);
            },
            nativeSetDragImage,
          });
        },
      }),
      dropTargetForElements({
        element: el,
        getData: ({ input, element, source }) => {
          const data = { type: "image", imageSrc: image };
          return data;
        },
        onDrop: ({ location, source, self }) => {
          const SelfImage = self.data.imageSrc as string;
          const SourceImage = source.data.imageSrc as string;

          const updatedPhotoBookData = swapImagePositions(
            photoBookData,
            SelfImage,
            SourceImage
          );
          setPhotoBookData(updatedPhotoBookData);
          setDragging(false);
        },
      })
    );
  }, [image, photoBookData, setPhotoBookData]);

  return (
    <>
      <Photo $dragging={dragging} src={image} alt="" ref={ref} />
      {preview &&
        createPortal(<PhotoDragPreview src={image} alt="" />, preview)}
    </>
  );
}
