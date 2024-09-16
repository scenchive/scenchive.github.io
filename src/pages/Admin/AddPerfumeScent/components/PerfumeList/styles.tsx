import styled from '@emotion/styled';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const PerfumeListArea = styled.div`
  label: brand-list-area;
  position: absolute;
  top: 28px;
  width: 210px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #ffffff;
  border: 1px solid #08799c;
  border-radius: 5px;
  /* 스크롤바 스타일 조정 */
  ::-webkit-scrollbar {
    width: 6px; /* 스크롤바 너비 */
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* 스크롤바 배경 색상 */
  }

  ::-webkit-scrollbar-thumb {
    background: #63c5c3; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥글게 */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* 스크롤바 호버 색상 */
  }
`;

export const PerfumeListRow = styled.div`
  label: brand-list-row;
  width: inherit;
  min-height: 28px;
  height: auto;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 13px;
  font-weight: 500;
  color: #08799c;
  border-top: 1px solid #ececec;
  align-content: center;
  cursor: pointer;
  :hover {
    background-color: #e0f1fd;
  }
`;
