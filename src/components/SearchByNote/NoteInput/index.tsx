import React, { useEffect, useState, useRef, SyntheticEvent } from 'react';
import { handleAddNote } from '../../../handlers/searchByNoteHandler';
import useSearch from '../../../hooks/search/useSearch';
import {
  Row,
  RowTitle,
  RowInput,
  TopMiddleBaseSelect,
  NoteListArea,
  NoteListRow,
} from './styles';

interface NoteInputProps {
  topMiddleBase: number | undefined;
  setTopMiddleBase: React.Dispatch<React.SetStateAction<number | undefined>>;
  setNoteEnglish: React.Dispatch<React.SetStateAction<string>>;
  noteEnglish: string;
  setNoteKorean: React.Dispatch<React.SetStateAction<string>>;
  noteKorean: string;
  notes: { top: string[]; middle: string[]; base: string[] };
  setNotes: React.Dispatch<
    React.SetStateAction<{
      top: string[];
      middle: string[];
      base: string[];
    }>
  >;
  setPerfumePage: React.Dispatch<React.SetStateAction<number>>;
}

interface NoteList {
  scent: string;
  scentKr: string;
}

const NoteInput: React.FC<NoteInputProps> = ({
  topMiddleBase,
  setTopMiddleBase,
  noteEnglish,
  setNoteEnglish,
  noteKorean,
  setNoteKorean,
  notes,
  setNotes,
  setPerfumePage,
}) => {
  const { getSearchNoteList } = useSearch();
  const [noteSearchWord, setNoteSearchWord] = useState<string>('');
  const [noteSearchWordResultList, setNoteSearchWordResultList] =
    useState<NoteList[]>();
  const [noteListToggle, setNoteListToggle] = useState<boolean>(false);

  const getNoteSearchResult = async () => {
    const result = await getSearchNoteList(noteSearchWord);
    if (result) {
      setNoteSearchWordResultList(result);
      setNoteListToggle(true);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (noteSearchWord.length >= 1) {
        getNoteSearchResult();
      } else {
        setNoteListToggle(false);
      }
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [noteSearchWord]);

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

      <RowTitle>노트 검색</RowTitle>
      <div style={{ position: 'relative', width: '300px' }}>
        <RowInput
          onChange={(e) => setNoteSearchWord(e.target.value)}
          placeholder="노트 이름을 한글/영문으로 검색해주세요."
          value={noteSearchWord}
        />
        {noteListToggle && noteSearchWordResultList && (
          <NoteListArea>
            {noteSearchWordResultList.map((el, index) => {
              return (
                <NoteListRow
                  key={'notelist_' + index}
                  onClick={() => {
                    handleAddNote(
                      el.scent,
                      el.scentKr,
                      topMiddleBase,
                      notes,
                      setNotes,
                      setNoteListToggle
                    );
                    setNoteListToggle(false);
                    setNoteSearchWord('');
                    setPerfumePage(0);
                  }}
                >
                  {el?.scentKr}
                  <br />({el?.scent})
                </NoteListRow>
              );
            })}
          </NoteListArea>
        )}
      </div>
    </Row>
  );
};

export default NoteInput;
