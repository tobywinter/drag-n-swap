import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { centerUnderPointer } from "@atlaskit/pragmatic-drag-and-drop/element/center-under-pointer";

import styled from "styled-components";
import invariant from "tiny-invariant";

const Photo = styled.img<{
  dragging: boolean;
}>`
  opacity: 1;

  /* Styles when dragging */
  ${(props) =>
    props.dragging &&
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
  alt?: string;
}
export function DraggablePhoto({ image, alt }: PhotoProps) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [preview, setPreview] = useState<HTMLElement>();

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      onDragStart(): void {
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
    });
  }, []);

  return (
    <>
      <Photo dragging={dragging} src={image} alt="" ref={ref} />;
      {preview &&
        createPortal(<PhotoDragPreview src={image} alt="" />, preview)}
    </>
  );
}
