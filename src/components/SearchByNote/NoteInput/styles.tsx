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

export const NoteListArea = styled.div`
  label: note-list-area;
  position: absolute;
  top: 33px;
  width: 300px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #ffffff;
  border: 1px solid #d67070;
  border-radius: 5px;
  box-sizing: border-box;
  /* 스크롤바 스타일 조정 */
  ::-webkit-scrollbar {
    width: 6px; /* 스크롤바 너비 */
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* 스크롤바 배경 색상 */
  }

  ::-webkit-scrollbar-thumb {
    background: #e3a6a1; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥글게 */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* 스크롤바 호버 색상 */
  }
`;

export const NoteListRow = styled.div`
  label: note-list-row;
  width: inherit;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 13px;
  font-weight: 500;
  font-family: Noto Sans Kr;
  align-content: center;
  cursor: pointer;
  text-align: center;

  :hover {
    background-color: rgb(255, 237, 235);
  }
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
