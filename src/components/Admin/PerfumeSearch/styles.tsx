import styled from '@emotion/styled';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Row = styled.div`
  label: row;
  width: 250px;
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
  width: 250px;
  font-size: 14px;
  height: 25px;
  box-sizing: border-box;
`;
