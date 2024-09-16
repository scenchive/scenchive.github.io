import React, { useEffect, useState, useRef, SyntheticEvent } from 'react';
import {
  Container,
  PageTitle,
  Row,
  RowTitle,
  RowInput,
  SelectedPerfumeImage,
  SelectedPerfumeName,
  TopMiddleBaseSelect,
  NoteTitle,
  // NoteList,
  DeleteButton,
  AddButton,
} from './styles';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import Search from '../../../components/Search';
import useApi from '../../../hooks/useApi';
import useUserTypeStore from '../../../stores/useUserAuthority';
import PerfumeList from './components/PerfumeList';
import NoteList from './components/NoteList';

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

  const [notes, setNotes] = useState({
    top: [] as string[][],
    middle: [] as string[][],
    base: [] as string[][],
  });

  const { fetchApi: fetchPerfumeSearchResult } = useApi<any>();
  const { data: existingNotes, fetchApi: fetchExistingNotes } = useApi<any>();
  const { fetchApi: fetchPostPerfume } = useApi<{ perfumeId?: number }>();

  const getPerfumeSearchResult = async () => {
    // setBrandName("");
    // setBrandNameKorean("");
    try {
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
    }
  };

  const handlePerfumeSelect = (el: Brand) => {
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

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/assets/image/image_perfume.svg';
  };

  const validateNoteInput = () => {
    if (!noteKorean || !noteEnglish) {
      alert('모든 값을 정확히 입력해주세요.');
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(noteEnglish)) {
      alert('노트 영문 이름은 영어로 입력해야 합니다.');
      return false;
    }
    if (!/^[가-힣\s]+$/.test(noteKorean)) {
      alert('노트 한글 이름은 한글로 입력해야 합니다.');
      return false;
    }
    return true;
  };

  const handleAddNote = () => {
    if (!validateNoteInput()) return;

    const key =
      topMiddleBase === 1 ? 'top' : topMiddleBase === 2 ? 'middle' : 'base';

    // existingNotes, notes에서 noteKorean 중복 여부 확인
    const isDuplicate =
      existingNotes[key]?.some(
        (note: string) => note === noteKorean // note는 noteKorean에 해당
      ) ||
      notes[key]?.some(
        (note) =>
          note[1] === noteKorean && note[2] === topMiddleBase?.toString()
      );

    if (isDuplicate) {
      alert('이미 추가하신 노트입니다.');
      return;
    }
    setNotes((prevNotes) => ({
      ...prevNotes,
      [key]: [
        ...prevNotes[key],
        [noteEnglish, noteKorean, topMiddleBase?.toString()],
      ],
    }));
    setNoteEnglish('');
    setNoteKorean('');
  };

  const handleDelete = (el: string[]) => {
    const key = el[2] === '1' ? 'top' : el[2] === '2' ? 'middle' : 'base';

    setNotes((prevNotes) => ({
      ...prevNotes,
      [key]: prevNotes[key].filter((n) => n[0] !== el[0] || n[1] !== el[1]),
    }));
  };

  const handlePostAddPerfumeScent = async () => {
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
          resetForm();
        }
      }
    } catch (error) {
      console.error('향수 등록 중 오류 발생', error);
    }
  };

  const resetForm = () => {
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

  useEffect(() => {
    if (userType !== 'ROLE_ADMIN') {
      navigate('/');
    }
  }, [userType]);

  useEffect(() => {
    setPerfumePage(0);
    setPerfumeSearchResultList([]);
    // setPerfumeListToggle(false);
    // if (perfumeSearchKeyword.length === 0) {
    //   setPerfumeListToggle(false);
    // }
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
      if (brandListRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = brandListRef.current;
        const threshold = 5;

        if (scrollTop + clientHeight + threshold >= scrollHeight) {
          if (
            perfumeSearchResultTotal &&
            perfumePage * 10 < perfumeSearchResultTotal
          ) {
            setPerfumePage((prevPage) => prevPage + 1);
          }
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
      <Row>
        <RowTitle style={{ marginBottom: '2px' }}>향수 검색</RowTitle>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <RowInput
            style={{ width: '220px', marginRight: '8px' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPerfumeSearchKeyword(e.target.value);
            }}
            placeholder="향수 영문 이름을 검색하세요."
            value={perfumeSearchKeyword}
          />
          <img
            onClick={getPerfumeSearchResult}
            style={{ cursor: 'pointer' }}
            src="/assets/icon/icon_search.svg"
          />
          {perfumeListToggle && perfumeSearchResultList && (
            <PerfumeList
              brandListRef={brandListRef}
              perfumeSearchResultList={perfumeSearchResultList}
              handlePerfumeSelect={handlePerfumeSelect}
            />
          )}
        </div>
      </Row>
      <Row>
        {brandNameKorean && brandName && perfumeName ? (
          <>
            <SelectedPerfumeImage src={perfumeImage} onError={handleError} />
            <SelectedPerfumeName>
              {brandNameKorean}({brandName}) <br /> {perfumeName}
            </SelectedPerfumeName>
          </>
        ) : (
          <></>
        )}
      </Row>
      <hr style={{ width: '100px', marginTop: '20px', marginBottom: '20px' }} />
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
          onClick={handleAddNote}
        >
          추가
        </AddButton>
      </Row>
      <NoteList
        title={'탑노트'}
        notes={notes?.top}
        handleDelete={handleDelete}
      />
      <NoteList
        title={'미들노트'}
        notes={notes?.middle}
        handleDelete={handleDelete}
      />
      <NoteList
        title={'베이스노트'}
        notes={notes?.base}
        handleDelete={handleDelete}
      />
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
      <AddButton onClick={() => handlePostAddPerfumeScent()}>
        등록하기
      </AddButton>
    </Container>
  );
};

export default AddPerfumeScent;
