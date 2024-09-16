import React, { useEffect, useState, useRef, SyntheticEvent } from 'react';
import { NoteTitle, NoteListRow, DeleteButton } from './styles';
import { handleDelete } from '../../../../../handlers/addPerfumeHandlers';

interface NoteListProps {
  title: string;
  notes: string[][];
  setNotes: React.Dispatch<
    React.SetStateAction<{
      top: string[][];
      middle: string[][];
      base: string[][];
    }>
  >;
}

const NoteList: React.FC<NoteListProps> = ({ title, notes, setNotes }) => {
  return (
    <>
      <NoteTitle>{title}</NoteTitle>
      {notes.map((el, index) => (
        <NoteListRow key={title + '_' + index}>
          {el[0]}({el[1]})
          <DeleteButton
            onClick={() => {
              if (window.confirm('이 노트를 삭제하시겠습니까?')) {
                handleDelete(el, notes, setNotes);
              }
            }}
            src="/assets/icon/icon_delete_comment_x.svg"
          />
        </NoteListRow>
      ))}
    </>
  );
};

export default NoteList;
