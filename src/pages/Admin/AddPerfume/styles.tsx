import styled from '@emotion/styled';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Container = styled.div`
  label: container;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 50px;
`;

export const PageTitle = styled.h1`
  label: page-title;
  font-size: 25px;
  margin-top: 30px;
`;

export const PerfumeArea = styled.div`
  label: Perfume-logo-area;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const PerfumeDummyDiv = styled.div`
  label: Perfume-logo-dummy-div;
  font-size: 15px;
  width: 200px;
  height: 200px;
  background-color: #cfcfcf;
  align-content: center;
`;

export const PreviewPerfumeImage = styled.img`
  label: preview-Perfume-logo-image;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  object-fit: contain;
  margin-left: auto;
  margin-right: auto;
`;

export const ImageUploadTitle = styled.label`
  label: pfp-upload-title;
  color: #08799c;
  font-size: 1.3rem;
  font-family: Noto Sans KR;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
`;

export const BrandListArea = styled.div`
  label: brand-list-area;
  position: absolute;
  top: 28px;
  width: 220px;
  background-color: #ffffff;
  border: 1px solid #08799c;
  border-radius: 5px;
`;

export const BrandListRow = styled.div`
  label: brand-list-row;
  width: inherit;
  height: 28px;
  font-size: 13px;
  align-content: center;
  cursor: pointer;
  :hover {
    background-color: #e0f1fd;
  }
`;

export const Row = styled.div`
  label: row;
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  align-items: start;
`;

export const RowTitle = styled.div`
  label: row-title;
  font-size: 16px;
  font-weight: 500px;
  margin-bottom: 6px;
`;

export const BrandWarning = styled.div`
  label: brand-warning;
  font-size: 11px;
  color: red;
  margin-bottom: 8px;
  cursor: pointer;
`;

export const RowInput = styled.input`
  label: row-input;
  width: 250px;
  font-size: 14px;
  height: 25px;
  box-sizing: border-box;
`;

export const AddButton = styled.button`
  label: add-button;
  width: 50px;
  height: 30px;
  font-size: 15px;
  color: #ffffff;
  margin-top: 15px;
  background-color: #19b3b1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
