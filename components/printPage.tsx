import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Actions from "./actions";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";

const Wrapper = styled.div`
  width: 600px;
  margin: auto;
  color: #585858;
`;

const PrintWrapper = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

const PageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #2778a5;
  border-radius: 8px;
  padding: 20px;
  margin: 17px 0 42px;
  justify-content: space-between;
`;

const PrintPhoto = styled.div`
  width: calc(50% - 10px);

  img {
    max-width: 100%;
  }
`;

export interface DataEntry {
  title: string;
  images: string[];
}

export interface PrintPageProps {
  data: DataEntry[];
}

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
interface PhotoProps {
  image: string;
  alt?: string;
}
function DraggablePhoto({ image, alt }: PhotoProps) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, []);

  return <Photo dragging={dragging} src={image} alt="" ref={ref} />;
}

export default function PrintPage({ data }: PrintPageProps) {
  return (
    <>
      <Wrapper>
        {Object.values(data).map((entry, i) => {
          return (
            <PrintWrapper key={i}>
              <Header>
                <Title>{entry.title}</Title>
                <Actions />
              </Header>
              <PageLayout>
                {entry.images.map((image) => {
                  return (
                    <PrintPhoto key={image}>
                      <DraggablePhoto image={image} />
                    </PrintPhoto>
                  );
                })}
              </PageLayout>
            </PrintWrapper>
          );
        })}
      </Wrapper>
    </>
  );
}
