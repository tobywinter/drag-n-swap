import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useDrag, useDrop } from "react-dnd";

import { swapImagePositions } from "./utils/swapImagePositions";
import DragPreview from "./dragPreview";
import {
  BorderAnimation,
  OnDropAnimation,
  onDropInRevealAnimationVariants,
} from "./animations";

const PrintPhoto = styled(motion.div)`
  position: relative;
`;

const Photo = styled.img<{
  $dragging?: boolean;
  $draggedOver?: boolean;
}>`
  ${(props) =>
    props.$dragging &&
    `
        transition: opacity 0.8s;
        opacity: 0.5;
      `}

  ${(props) =>
    props.$draggedOver &&
    `
        transition: opacity 0.8s;
        opacity: 0.5;
      `}
`;

export const DraggablePhoto = ({ image, photoBookData, setPhotoBookData }) => {
  const [showDropAnimation, setShowDropAnimation] = useState(false);
  const [dragged, setDragged] = useState("");
  const [dropzone, setDropzone] = useState("");

  const [{ isDragging }, drag, preview] = useDrag(
    {
      type: "image",
      item: { draggedImage: image },
      collect: (monitor) => {
        setDropzone(image);
        return {
          isDragging: monitor.isDragging(),
        };
      },
    },
    [image, photoBookData, setPhotoBookData]
  );

  const [collect, drop] = useDrop({
    accept: "image",
    drop: (item: { draggedImage: string }) => {
      setDragged(item.draggedImage);
      setShowDropAnimation(true);
    },
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <>
      <PrintPhoto ref={(node) => drag(drop(node))}>
        <AnimatePresence>
          {showDropAnimation && dropzone == image && (
            <React.Fragment>
              <BorderAnimation
                initial="closed"
                animate="open"
                variants={onDropInRevealAnimationVariants}
              />
              <OnDropAnimation
                src={dragged || ""}
                initial="closed"
                animate="openWithDelay"
                variants={onDropInRevealAnimationVariants}
                onAnimationComplete={() => {
                  setShowDropAnimation(false);
                  const updatedPhotoBookData = swapImagePositions(
                    photoBookData,
                    dragged,
                    dropzone
                  );
                  setPhotoBookData(updatedPhotoBookData);
                }}
              />
            </React.Fragment>
          )}
        </AnimatePresence>
        <Photo
          src={image}
          alt={image}
          $dragging={isDragging}
          $draggedOver={collect.isOver && collect.canDrop}
        />
      </PrintPhoto>

      <DragPreview
        src={image}
        width={90}
        height={90}
        borderColor="white"
        setDragImage={(node, offsetX, offsetY) =>
          preview(node, { offsetX, offsetY })
        }
      />
    </>
  );
};

export default DraggablePhoto;
