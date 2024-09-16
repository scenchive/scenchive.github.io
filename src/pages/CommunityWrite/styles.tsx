import styled from '@emotion/styled';
const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Container = styled.div`
  label: container;
  width: 100%;
  min-height: 800px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
`;

export const Main = styled.div`
  label: main;
  width: 60%;
  margin-top: 60px;
  display: flex;
  flex-direction: column;

  ${mediaQuery} {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

export const PageTitle = styled.div`
  label: page-title;
  color: #616161;
  font-size: 2.2rem;
  font-family: Noto Sans KR;
  margin-bottom: 40px;
`;

export const InputRow = styled.div`
  label: title-row;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const RowTitle = styled.div`
  label: row-title;
  width: 10%;
  text-align: left;
  color: #616161;
  font-size: 1.4rem;
  font-family: Noto Sans KR;
`;

export const TitleInput = styled.input`
  label: title-input;
  width: -webkit-fill-available;
  height: 25px;
  padding: 2px 10px;
  border: 1px solid #dfdfdf;
  white-space: nowrap;
  overflow-y: hidden;
  resize: none;
  overflow: hidden;
  :focus {
    outline: none;
  }
`;

export const MenuInputArea = styled.div`
  label: menu-input-area;
  width: -webkit-fill-available;
  display: flex;
  flex-direction: row;
`;

export const CommunityMenu = styled.div<{ isSelected: boolean }>`
  label: community-menu;
  margin-right: 10px;
  padding: 3px 8px 4px 8px;
  border: ${(props) =>
    props.isSelected ? '1px solid #E3A6A1' : '1px solid #BABABA'};
  background-color: ${(props) =>
    props.isSelected ? '#E3A6A1' : 'transparent'};
  border-radius: 20px;
  color: ${(props) => (props.isSelected ? '#FFFFFF' : '#BABABA')};
  font-family: Noto Sans KR;
  font-size: 1.1rem;
  cursor: pointer;
`;

export const CommunityContentInput = styled.textarea`
  label: community-content-input;
  width: -webkit-fill-available;
  height: 300px;
  padding: 15px;
  border: 1px solid #dfdfdf;
  color: #717171;
  font-family: Noto Sans KR;
  font-size: 1.2rem;
  resize: none;
  :focus {
    outline: none;
  }
`;

export const ImageUplaodArea = styled.div`
  label: image-upload-area;
  margin-right: auto;
  margin-top: 10px;
`;

export const ImageUploadButtonDesign = styled.label`
  label: image-upload-button-design;
  width: fit-content;
  color: #e3a6a1;
  font-family: Noto Sans KR;
  font-size: 1rem;
  margin-top: 40px;
  margin-right: auto;
  border-radius: 5px;
  cursor: pointer;
`;

export const ImageUploadButton = styled.input`
  label: image-upload-button;
  display: none;
`;

export const WriteButton = styled.div`
  label: write-original-button;
  width: fit-content;
  color: #ffffff;
  font-family: Noto Sans KR;
  font-size: 1.2rem;
  margin-top: 40px;
  margin-left: auto;
  margin-bottom: 100px;
  padding: 5px 10px;
  background-color: #d67070;
  border-radius: 2px;
  cursor: pointer;
`;
