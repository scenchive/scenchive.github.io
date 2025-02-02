import React, { useEffect, useState, useRef, SyntheticEvent } from 'react';
import {
  Container,
  Title,
  SearchNotice,
  NoteArea,
  AddButton,
  PerfumeListArea,
} from './styles';
import { useNavigate } from 'react-router-dom';
import Header from '../../common/Header';
import Search from '../../common/Search';
import NoteList from '../../components/SearchByNote/NoteList';
import NoteInput from '../../components/SearchByNote/NoteInput';
import PerfumeList from '../../components/SearchByNote/PerfumeList';
import useSearch from '../../hooks/search/useSearch';

interface Perfume {
  brandId: number;
  brandImage: string;
  brandName: string;
  brandName_kr: string;
  perfumeId: number;
  perfumeName: string;
  perfume_kr: string | null;
  perfumeImage: string;
}

const SearchByNote = () => {
  const navigate = useNavigate();
  const noteListRef = useRef<HTMLDivElement>(null);
  const { getSearchByNoteResultList } = useSearch();

  const [perfumeSearchResultTotal, setPerfumeSearchResultTotal] =
    useState<number>();
  const [perfumeSearchResultList, setPerfumeSearchResultList] = useState<
    Perfume[]
  >([]);
  const [perfumePage, setPerfumePage] = useState<number>(0);
  const [noteKorean, setNoteKorean] = useState<string>('');
  const [noteEnglish, setNoteEnglish] = useState<string>('');
  const [topMiddleBase, setTopMiddleBase] = useState<number | undefined>(1);
  const [notes, setNotes] = useState({
    top: [] as string[],
    middle: [] as string[],
    base: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const view = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPerfumePage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: '10px', threshold: 1.0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [target, loading]);

  useEffect(() => {
    if (
      perfumePage > 0 &&
      (notes.top.length || notes.middle.length || notes.base.length)
    ) {
      postSearchByNote();
    }
  }, [perfumePage]);

  const callback = () => {
    if (perfumeSearchResultList.length > 0) {
      if (perfumePage !== -1) {
        setPerfumePage((prev) => prev + 1);
      }
    }
  };

  const options = {
    root: view.current,
    rootMargin: '10px',
    threshold: 1.0,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      callback();
      observer.unobserve(entries[0].target);
    }
  }, options);

  const postSearchByNote = async () => {
    if (!notes.top.length && !notes.middle.length && !notes.base.length) {
      alert('노트를 올바르게 입력해주세요.');
      return;
    }

    const formData = new FormData();
    const blob = new Blob(
      [
        JSON.stringify({
          topNote: [...notes.top.map((el) => el[0])],
          middleNote: [...notes.middle.map((el) => el[0])],
          baseNote: [...notes.base.map((el) => el[0])],
        }),
      ],
      { type: 'application/json' }
    );

    formData.append('requestDto', blob);

    setLoading(true);
    try {
      const res = await getSearchByNoteResultList(formData, perfumePage);
      if (res?.totalBrandPerfumeCount > 0) {
        setPerfumeSearchResultList((prev) => [...prev, ...res.perfumes]);
        setPerfumeSearchResultTotal(res.totalBrandPerfumeCount);
      } else {
        setPerfumePage(-1);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header />
      <Search />
      <Title>향수 검색</Title>
      <SearchNotice>
        <span>노트</span>로 향수를 검색해보세요
      </SearchNotice>
      <>
        <NoteInput
          topMiddleBase={topMiddleBase}
          setTopMiddleBase={setTopMiddleBase}
          setNoteEnglish={setNoteEnglish}
          noteEnglish={noteEnglish}
          setNoteKorean={setNoteKorean}
          noteKorean={noteKorean}
          notes={notes}
          setNotes={setNotes}
          setPerfumePage={setPerfumePage}
        />

        <NoteArea>
          <NoteList title={'탑노트'} notes={notes} setNotes={setNotes} />
          <NoteList title={'미들노트'} notes={notes} setNotes={setNotes} />
          <NoteList title={'베이스노트'} notes={notes} setNotes={setNotes} />

          <AddButton
            onClick={() => {
              setPerfumePage(0);
              setPerfumeSearchResultList([]);
              postSearchByNote();
            }}
          >
            검색하기
          </AddButton>
        </NoteArea>
      </>
      {perfumeSearchResultList?.length > 0 && (
        <PerfumeListArea>
          {perfumeSearchResultList?.map((perfume, index) => {
            return <PerfumeList key={'perfume_' + index} perfume={perfume} />;
          })}

          <div
            ref={setTarget}
            style={{
              backgroundColor: 'red',
              width: '100%',
              height: '180px',
            }}
          />
        </PerfumeListArea>
      )}
      {/* )} */}
    </Container>
  );
};

export default SearchByNote;
