import React, { useEffect, useState, useRef, SyntheticEvent } from 'react';
import { handleAddNote } from '../../../handlers/addPerfumeHandlers';
import {
  Row,
  RowTitle,
  RowInput,
  TopMiddleBaseSelect,
  AddButton,
} from './styles';

interface NoteInputProps {
  topMiddleBase: number | undefined;
  setTopMiddleBase: React.Dispatch<React.SetStateAction<number | undefined>>;
  setNoteEnglish: React.Dispatch<React.SetStateAction<string>>;
  noteEnglish: string;
  setNoteKorean: React.Dispatch<React.SetStateAction<string>>;
  noteKorean: string;
  notes: { top: string[][]; middle: string[][]; base: string[][] };
  setNotes: React.Dispatch<
    React.SetStateAction<{
      top: string[][];
      middle: string[][];
      base: string[][];
    }>
  >;
  existingNotes: any;
}

const NoteInput: React.FC<NoteInputProps> = ({
  topMiddleBase,
  setTopMiddleBase,
  setNoteEnglish,
  noteEnglish,
  setNoteKorean,
  noteKorean,
  notes,
  setNotes,
  existingNotes,
}) => {
  return (
    <Row>
      <RowTitle>탑/미들/베이스 선택</RowTitle>
      <TopMiddleBaseSelect
        defaultValue="1"
        onChange={(e) => setTopMiddleBase(Number(e.target.value))}
      >
        <option value="1">탑노트</option>
        <option value="2">미들노트</option>
        <option value="3">베이스노트</option>
      </TopMiddleBaseSelect>

      <RowTitle>노트 영문 이름</RowTitle>
      <RowInput
        onChange={(e) => setNoteEnglish(e.target.value)}
        placeholder="노트 영문 이름을 입력해주세요."
        value={noteEnglish}
      />
      <RowTitle>노트 한글 이름</RowTitle>
      <RowInput
        onChange={(e) => setNoteKorean(e.target.value)}
        placeholder="노트 한글 이름을 입력해주세요."
        value={noteKorean}
      />

      <AddButton
        style={{
          backgroundColor: '#74d8d7',
          fontSize: '13px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        onClick={() =>
          handleAddNote(
            noteEnglish,
            noteKorean,
            topMiddleBase,
            notes,
            setNotes,
            existingNotes
          )
        }
      >
        추가
      </AddButton>
    </Row>
  );
};

export default NoteInput;
