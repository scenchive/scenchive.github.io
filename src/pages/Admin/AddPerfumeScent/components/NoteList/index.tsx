import React, { useEffect, useState, useRef, SyntheticEvent } from 'react';
import { NoteTitle, NoteListRow, DeleteButton } from './styles';
import { useNavigate } from 'react-router-dom';

interface NoteListProps {
  title: string;
  notes: string[][];
  handleDelete: (note: string[]) => void;
}

const NoteList: React.FC<NoteListProps> = ({ title, notes, handleDelete }) => {
  return (
    <>
      {/* <article>
        <NoteTitle>탑노트</NoteTitle>
        {notes.top.map((el, index) => (
          <NoteList key={"top_" + index}>
            {el[0]}({el[1]})
            <DeleteButton
              onClick={() => {
                alert("이 노트를 삭제하시겠습니까?");
                handleDelete(el);
              }}
              src="/assets/icon/icon_delete_comment_x.svg"
            />
          </NoteList>
        ))}

        <NoteTitle>미들노트</NoteTitle>
        {notes.middle.map((el, index) => (
          <NoteList key={"middle_" + index}>
            {el[0]}({el[1]})
            <DeleteButton
              onClick={() => {
                alert("이 노트를 삭제하시겠습니까?");
                handleDelete(el);
              }}
              src="/assets/icon/icon_delete_comment_x.svg"
            />
          </NoteList>
        ))}

        <NoteTitle>베이스노트</NoteTitle>
        {notes.base.map((el, index) => (
          <NoteList key={"base_" + index}>
            {el[0]}({el[1]})
            <DeleteButton
              onClick={() => {
                alert("이 노트를 삭제하시겠습니까?");
                handleDelete(el);
              }}
              src="/assets/icon/icon_delete_comment_x.svg"
            />
          </NoteList>
        ))}
      </article> */}
      <article>
        <NoteTitle>{title}</NoteTitle>
        {notes.map((el, index) => (
          <NoteListRow key={title + '_' + index}>
            {el[0]}({el[1]})
            <DeleteButton
              onClick={() => {
                if (window.confirm('이 노트를 삭제하시겠습니까?')) {
                  handleDelete(el);
                }
              }}
              src="/assets/icon/icon_delete_comment_x.svg"
            />
          </NoteListRow>
        ))}
      </article>
    </>
  );
};

export default NoteList;
