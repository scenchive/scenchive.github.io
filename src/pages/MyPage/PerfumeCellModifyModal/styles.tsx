import styled from '@emotion/styled';

export const ModalBackgroundArea = styled.div<{
  isModalOpen: boolean | undefined;
}>`
  label: modal-background-area;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: ${(props) =>
    props.isModalOpen === true ? '#000000' : null};
  opacity: ${(props) => (props.isModalOpen === true ? '0.79' : null)};
  z-index: ${(props) => (props.isModalOpen === true ? '1000' : null)};
`;

export const ModalArea = styled.div<{ isModalOpen: boolean | undefined }>`
  label: modal-area;
  width: 60%;
  position: absolute;
  left: 50%;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, 0);
  background-color: #ffffff;
  margin: 100px auto 200px auto;
  padding: 50px;
  flex-flow: wrap;
  z-index: ${(props) => (props.isModalOpen === true ? '1000' : null)};
`;

export const ModalTitle = styled.div`
  label: modal-title;
  color: #242424;
  font-size: 2rem;
  font-family: Noto Sans KR;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
`;

export const SectionArea = styled.div`
  label: section-area;
  width: fit-content;
  display: flex;
  flex-direction: column;
`;

export const KeywordTitle = styled.div`
  label: keyword-title;
  color: #616161;
  font-size: 1.5rem;
  font-family: Noto Sans KR;
  margin-right: auto;
  margin-bottom: 15px;
`;

export const KeywordArea = styled.div`
  label: keyword-area;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
`;

export const KeywordCell = styled.div`
  label: keyword-cell;
  width: fit-content;
  font-size: 1.3rem;
  font-family: Noto Sans KR;
  padding: 4px 10px 5px;
  color: #616161;
  border: 1.5px solid #e3a6a1;
  border-radius: 30px;
  background-color: #f6f2ff;
  margin-bottom: 5px;
  margin-right: 3px;
  cursor: pointer;
`;

export const ModifyButton = styled.div`
  label: modify-button;
  width: fit-content;
  color: #ffffff;
  font-family: Noto Sans KR;
  font-size: 1.6rem;
  background-color: #d67070;
  padding: 5px 38px 6px;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 2px;
  cursor: pointer;
`;

export const CancelButton = styled.img`
  label: cancel-button;
  width: 15px;
  height: 15px;
  position: absolute;
  right: 50px;
  cursor: pointer;
`;
