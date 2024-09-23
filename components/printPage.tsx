import React from "react";
import styled from "styled-components";
import Actions from "./actions";
import { DraggablePhoto } from "./draggablePhoto";
import { PhotoLocations } from "./photoLocations";

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
                    <PhotoLocations key={image}>
                      <DraggablePhoto image={image} />
                    </PhotoLocations>
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
