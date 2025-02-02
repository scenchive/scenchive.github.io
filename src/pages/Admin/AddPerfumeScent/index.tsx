import React, { useEffect, useState, useRef, SyntheticEvent } from 'react';
import {
  Container,
  PageTitle,
  Row,
  SelectedPerfumeImage,
  SelectedPerfumeName,
  NoteArea,
  AddButton,
} from './styles';
import { useNavigate } from 'react-router-dom';
import Header from '../../../common/Header';
import Search from '../../../common/Search';
import useApi from '../../../hooks/useApi';
import useUserTypeStore from '../../../stores/useUserAuthority';
import NoteList from '../../../components/Admin/NoteList';
import NoteInput from '../../../components/Admin/NoteInput';
import PerfumeSearch from '../../../components/Admin/PerfumeSearch';

interface Brand {
  brandId: number | null;
  brandImage: string;
  brandName: string;
  brandName_kr: string;
  perfumeId: number;
  perfumeName: string;
  perfumeImage: string;
}

const AddPerfumeScent = () => {
  const { userType } = useUserTypeStore();
  const navigate = useNavigate();
  const brandListRef = useRef<HTMLDivElement>(null);
  const { fetchApi: fetchPerfumeSearchResult } = useApi<any>();
  const { data: existingNotes, fetchApi: fetchExistingNotes } = useApi<any>();
  const { fetchApi: fetchPostPerfume } = useApi<{ perfumeId?: number }>();

  const [perfumeListToggle, setPerfumeListToggle] = useState<boolean>(false);
  const [perfumeSearchResultTotal, setPerfumeSearchResultTotal] =
    useState<number>();
  const [perfumeSearchResultList, setPerfumeSearchResultList] = useState<
    Brand[]
  >([]);
  const [perfumeSearchKeyword, setPerfumeSearchKeyword] = useState<string>('');
  const [perfumeName, setPerfumeName] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('');
  const [brandNameKorean, setBrandNameKorean] = useState<string>('');
  const [perfumePage, setPerfumePage] = useState<number>(0);
  const [perfumeId, setPerfumeId] = useState<number | undefined>();
  const [perfumeImage, setPerfumeImage] = useState<string>('');
  const [noteKorean, setNoteKorean] = useState<string>('');
  const [noteEnglish, setNoteEnglish] = useState<string>('');
  const [topMiddleBase, setTopMiddleBase] = useState<number | undefined>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [notes, setNotes] = useState({
    top: [] as string[][],
    middle: [] as string[][],
    base: [] as string[][],
  });

  const selectPerfume = (el: Brand) => {
    setPerfumeListToggle(false);
    setPerfumeSearchKeyword('');
    setPerfumeId(el?.perfumeId);
    setPerfumeImage(
      el?.perfumeImage ? el?.perfumeImage : '/assets/image/image_perfume.svg'
    );
    setPerfumeName(el?.perfumeName);
    setBrandName(el?.brandName);
    setBrandNameKorean(el?.brandName_kr);
  };

  const resetPerfumeForm = () => {
    setPerfumeSearchKeyword('');
    setPerfumeName('');
    setBrandName('');
    setBrandNameKorean('');
    setPerfumePage(0);
    setPerfumeId(undefined);
    setNoteKorean('');
    setNoteEnglish('');
    setNotes({
      top: [],
      middle: [],
      base: [],
    });
  };

  const getPerfumeSearchResult = async () => {
    try {
      setIsFetching(true);
      const res = await fetchPerfumeSearchResult(
        'get',
        `/search?name=${encodeURI(perfumeSearchKeyword)}&page=${perfumePage}`
      );
      if (res?.perfumes) {
        setPerfumeSearchResultList((prev) =>
          prev ? [...prev, ...res?.perfumes] : res?.perfumes
        );
        setPerfumeListToggle(true);
        setPerfumeSearchResultTotal(res?.perfumesNum);
      }
    } catch (error) {
      setPerfumeSearchResultList([]);
      setPerfumePage(0);
    } finally {
      setIsFetching(false); // Fetch 종료
    }
  };

  const postAddPerfumeScent = async () => {
    if (
      !perfumeId ||
      (!notes.top.length && !notes.middle.length && !notes.base.length)
    ) {
      alert('향수 모든 정보를 올바르게 입력해주세요.');
      return;
    }

    const data = {
      perfumeId: perfumeId,
      scents: [...notes.top, ...notes.middle, ...notes.base],
    };

    try {
      const res = await fetchPostPerfume('post', '/master/note', data, {
        Authorization: 'Bearer ' + localStorage.getItem('my-token'),
        accept: 'application/json',
      });

      if (res?.perfumeId) {
        if (
          window.confirm(
            `노트 정보를 등록하였습니다.${brandName}(${brandNameKorean}) ${perfumeName} 향수 상세 페이지로 이동하시겠습니까?`
          )
        ) {
          navigate(`/perfumedetail?perfume=${perfumeId}`);
        } else {
          resetPerfumeForm();
        }
      }
    } catch (error) {
      console.error('향수 등록 중 오류 발생', error);
    }
  };

  useEffect(() => {
    if (userType !== 'ROLE_ADMIN') {
      navigate('/');
    }
  }, [userType]);

  useEffect(() => {
    setPerfumePage(0);
    setPerfumeSearchResultList([]);
    const debounce = setTimeout(() => {
      if (perfumeSearchKeyword.length > 1) {
        getPerfumeSearchResult();
      } else {
        setPerfumeSearchResultList([]);
        setPerfumeListToggle(false);
      }
    }, 300);
    return () => {
      clearTimeout(debounce);
    };
  }, [perfumeSearchKeyword]);

  useEffect(() => {
    const handleScroll = () => {
      if (isFetching || !brandListRef.current) return; // Fetch 중이거나 참조가 없을 때는 실행 안 함

      const { scrollTop, scrollHeight, clientHeight } = brandListRef.current;
      const threshold = 700;

      if (scrollTop + clientHeight + threshold >= scrollHeight) {
        if (
          perfumeSearchResultTotal &&
          perfumePage * 10 < perfumeSearchResultTotal
        ) {
          setPerfumePage((prevPage) => prevPage + 1);
        }
      }
    };

    const refCurrent = brandListRef.current;
    refCurrent?.addEventListener('scroll', handleScroll);

    return () => {
      refCurrent?.removeEventListener('scroll', handleScroll);
    };
  }, [perfumePage, perfumeSearchResultTotal, perfumeSearchResultList]);

  useEffect(() => {
    if (perfumePage > 0) {
      getPerfumeSearchResult();
    }
  }, [perfumePage]);

  useEffect(() => {
    try {
      fetchExistingNotes('get', `/notesinfo/${perfumeId}`, {
        Authorization: 'Bearer ' + localStorage.getItem('my-token'),
        accept: 'application/json',
      });
    } catch (error) {
      console.error('향수 등록 중 오류 발생', error);
    }
  }, [perfumeName]);

  return (
    <Container>
      <Header />
      <Search />
      <PageTitle>향수 노트 추가</PageTitle>
      <PerfumeSearch
        setPerfumeSearchKeyword={setPerfumeSearchKeyword}
        perfumeSearchKeyword={perfumeSearchKeyword}
        getPerfumeSearchResult={getPerfumeSearchResult}
        perfumeListToggle={perfumeListToggle}
        perfumeSearchResultList={perfumeSearchResultList}
        brandListRef={brandListRef}
        selectPerfume={selectPerfume}
      />

      {perfumeName && (
        <>
          {brandNameKorean && brandName && perfumeName && (
            <Row>
              <SelectedPerfumeImage
                src={perfumeImage}
                onError={(e) =>
                  (e.currentTarget.src = '/assets/image/image_perfume.svg')
                }
              />
              <SelectedPerfumeName>
                {brandNameKorean}({brandName}) <br /> {perfumeName}
              </SelectedPerfumeName>
            </Row>
          )}

          <hr
            style={{ width: '100px', marginTop: '20px', marginBottom: '20px' }}
          />

          <NoteInput
            topMiddleBase={topMiddleBase}
            setTopMiddleBase={setTopMiddleBase}
            setNoteEnglish={setNoteEnglish}
            noteEnglish={noteEnglish}
            setNoteKorean={setNoteKorean}
            noteKorean={noteKorean}
            notes={notes}
            setNotes={setNotes}
            existingNotes={existingNotes}
          />

          <NoteArea>
            <NoteList title={'탑노트'} notes={notes?.top} setNotes={setNotes} />
            <NoteList
              title={'미들노트'}
              notes={notes?.middle}
              setNotes={setNotes}
            />
            <NoteList
              title={'베이스노트'}
              notes={notes?.base}
              setNotes={setNotes}
            />

            <AddButton onClick={() => postAddPerfumeScent()}>
              등록하기
            </AddButton>
          </NoteArea>
        </>
      )}
    </Container>
  );
};

export default AddPerfumeScent;
