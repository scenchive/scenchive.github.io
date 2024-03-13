import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px 0;
  img {
    margin: 0 10px;
  }
`;

export const Number = styled.div<{ selected: boolean }>`
  font-family: Noto Sans Kr;
  color: ${(props) => (props.selected ? "#000000" : "#B2B2B2")};
  margin: 0 5px;
  font-size: 1.5rem;
`;
