import styled from '@emotion/styled';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const PerfumeListArea = styled.div`
  label: perfume-list-area;
  position: absolute;
  top: 32px;
  width: calc(100% - 35px);
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #ffffff;
  border: 1px solid #e3a6a1;
  border-radius: 5px;
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

export const PerfumeListRow = styled.div`
  label: perfume-list-row;
  min-height: 28px;
  height: auto;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 13px;
  font-weight: 500;
  color: #d67070;
  border-top: 1px solid #ececec;
  align-content: center;
  cursor: pointer;
  :hover {
    background-color: #e0f1fd;
  }
`;
