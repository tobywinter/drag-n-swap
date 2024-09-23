import { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import styled from "styled-components";
import invariant from "tiny-invariant";

const PrintPhoto = styled.div<{
  isdraggedover: boolean;
}>`
  width: calc(50% - 10px);

  img {
    max-width: 100%;
  }

  ${(props) =>
    props.isdraggedover &&
    `
      transition: opacity 0.8s;
      opacity: 0.5;
    `}
`;

export function PhotoLocations({ children }: React.PropsWithChildren<{}>) {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, []);

  return (
    <PrintPhoto isdraggedover={isDraggedOver} ref={ref}>
      {children}
    </PrintPhoto>
  );
}
