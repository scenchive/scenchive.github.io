import styled from '@emotion/styled';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Row = styled.div`
  label: row;
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  align-items: start;
`;

export const RowTitle = styled.h2`
  label: row-title;
  color: #242424;
  font-size: 2rem;
  font-weight: 550;
  margin-bottom: 8px;
  font-family: Gowun Batang;
`;

export const RowInput = styled.input`
  label: row-input;
  width: 300px;
  font-size: 1.3rem;
  color: #242424;
  box-sizing: border-box;
  border: 1px solid #b3b3b3;
  border-radius: 5px;
  padding: 8px 15px;
  outline: none;
`;

export const TopMiddleBaseSelect = styled.select`
  label: top-middle-base-select;
  width: inherit;
  font-size: 1.3rem;
  color: #242424;
  box-sizing: border-box;
  border: 1px solid #b3b3b3;
  border-radius: 5px;
  padding: 8px 15px;
`;

export const AddButton = styled.button`
  label: add-button;
  width: auto;
  height: 30px;
  font-size: 1.5rem;
  font-weight: 550;
  margin-left: auto;
  margin-right: auto;
  color: #ffffff;
  margin-top: 30px;
  background-color: #f5d0cd;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
