import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledPreview = styled.img<{
  width: number;
  height: number;
  $borderColor: string;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 50%;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  border: 3px solid ${(props) => props.$borderColor};
  object-fit: cover;
  pointer-events: none;
  z-index: 9999;
  /* Place off-screen */
  top: -1000px;
  left: -1000px;
`;

const DragPreview = ({
  src,
  width,
  height,
  borderColor,
  setDragImage,
}: {
  src: string;
  width: number;
  height: number;
  borderColor: string;
  setDragImage: (
    image: HTMLImageElement,
    offsetX: number,
    offsetY: number
  ) => any;
}) => {
  const previewRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (previewRef.current) {
      // Offset the preview to appear directly under the cursor
      setDragImage(previewRef.current, width / 2, height / 2);
    }
  }, [setDragImage, width, height]);

  return (
    <StyledPreview
      ref={previewRef}
      src={src}
      width={width}
      height={height}
      $borderColor={borderColor}
      alt="Drag Preview"
    />
  );
};

export default DragPreview;
