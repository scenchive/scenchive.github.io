import styled from '@emotion/styled';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Row = styled.div`
  label: row;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  align-items: start;
`;

export const RowTitle = styled.h2`
  label: row-title;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 6px;
`;

export const RowInput = styled.input`
  label: row-input;
  width: 100%;
  height: 30px;
  font-size: 1.4rem;
  font-family: Noto Sans Kr;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  padding: 2px 10px;
  outline: none;
`;
