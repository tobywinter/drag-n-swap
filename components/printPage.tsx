import React, { useState } from "react";
import styled from "styled-components";
import Actions from "./actions";
import { DraggablePhoto } from "./dragAndDropPhoto";
import DragDropContextWrapper from "./dragDropContext";

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

export interface PhotoBookPage {
  title: string;
  images: string[];
}

export interface PrintPageProps {
  data: PhotoBookPage[];
}

const PhotoContainer = styled.div<{}>`
  width: calc(50% - 10px);

  img {
    max-width: 100%;
  }
`;

export default function PrintPage({ data }: PrintPageProps) {
  const [photoBookData, setPhotoBookData] = useState(data);

  return (
    <>
      <DragDropContextWrapper>
        <Wrapper>
          {Object.values(photoBookData).map((entry, i) => {
            return (
              <PrintWrapper key={i}>
                <Header>
                  <Title>{entry.title}</Title>
                  <Actions />
                </Header>
                <PageLayout>
                  {entry.images.map((image, index) => {
                    return (
                      <PhotoContainer key={`${entry.title}+${index}`}>
                        <DraggablePhoto
                          image={image}
                          photoBookData={photoBookData}
                          setPhotoBookData={setPhotoBookData}
                        />
                      </PhotoContainer>
                    );
                  })}
                </PageLayout>
              </PrintWrapper>
            );
          })}
        </Wrapper>
      </DragDropContextWrapper>
    </>
  );
}
