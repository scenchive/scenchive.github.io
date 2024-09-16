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

export const SelectedPerfumeImage = styled.img`
  label: selected-perfume-image;
  width: 250px;
  height: 250px;
  border-radius: 20px;
  object-fit: constain;
  margin-bottom: 18px;
`;

export const SelectedPerfumeName = styled.strong`
  label: selected-perfume-name;
  width: inherit;
  font-size: 18px;
  font-weight: 400;
  color: #08799c;
`;

export const TopMiddleBaseSelect = styled.select`
  label: top-middle-base-select;
  width: inherit;
  height: 25px;
`;

export const NoteTitle = styled.h2`
  label: note-title;
  font-size: 18px;
  font-weight: 400;
`;

export const NoteList = styled.div`
  label: note-list;
  display: flex;
  flex-direction: row;
  color: #19b3b1;
  font-size: 16px;
`;

export const DeleteButton = styled.img`
  label: delete-button;
  width: 20px;
  height: 20px;
  border: none;
  background-color: transparent;
  margin-left: 3px;
  cursor: pointer;
`;

export const AddButton = styled.button`
  label: add-button;
  width: auto;
  height: 30px;
  font-size: 16px;
  color: #ffffff;
  margin-top: 15px;
  background-color: #19b3b1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
