import React, { useEffect, useState, useRef } from 'react';
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
  notes,
  setNotes,
  setPerfumePage,
}) => {
  const { getSearchNoteList } = useSearch();
  const [notePage, setNotePage] = useState<number>(0);
  const [totalNoteValueCount, setTotalNoteValueCount] = useState<number>(0);
  const [noteSearchWord, setNoteSearchWord] = useState<string>('');
  const [noteSearchWordResultList, setNoteSearchWordResultList] = useState<
    NoteList[]
  >([]);
  const [noteListToggle, setNoteListToggle] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const hasMore = noteSearchWordResultList.length < totalNoteValueCount;

  const getNoteSearchResult = async () => {
    if (!noteSearchWord) return;
    setLoading(true);

    const result = await getSearchNoteList(noteSearchWord, notePage);
    if (result) {
      setNoteSearchWordResultList((prev) => [...prev, ...result.notes]); // ✅ 데이터 누적
      setTotalNoteValueCount(result.totalNoteValueCount);
      setNoteListToggle(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (notePage > 0) {
      getNoteSearchResult();
    }
  }, [notePage]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (noteSearchWord.length >= 1) {
        setNotePage(0);
        setNoteSearchWordResultList([]);
        getNoteSearchResult();
      } else {
        setNoteListToggle(false);
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [noteSearchWord]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!hasMore || loading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setNotePage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: '10px', threshold: 1.0 }
    );

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasMore, loading]);

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
        {noteListToggle && noteSearchWordResultList.length > 0 && (
          <NoteListArea>
            {noteSearchWordResultList.map((el, index) => (
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
                  setNoteSearchWord('');
                  setPerfumePage(0);
                }}
              >
                {el?.scentKr}
                <br />({el?.scent})
              </NoteListRow>
            ))}
            <div
              ref={lastElementRef}
              style={{ width: '100%', height: '10px' }}
            />
          </NoteListArea>
        )}
      </div>
    </Row>
  );
};

export default NoteInput;
