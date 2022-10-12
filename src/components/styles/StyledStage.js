import styled from "styled-components";

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.height}, calc(25vw / ${(props) => props.width}));
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 1px solid #333;
  width: 100%;
  max-width: 25vw;
  background: #111;
`;

// rows는 세로 height수만큼 25vw에서 width나눈만큼 반복
// fr은 남은공간
