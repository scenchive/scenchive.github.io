import styled from '@emotion/styled';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const NoteTitle = styled.h2`
  label: note-title;
  font-size: 18px;
  font-weight: 400;
`;

export const NoteListRow = styled.div`
  label: note-list-row;
  display: flex;
  flex-direction: row;
  color: #d67070;
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
