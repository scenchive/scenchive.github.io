import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Container,
  Main,
  PerfumeInformationArea,
  PerfumeImage,
  PerfumeInformation,
  BrandNameKR,
  PageTitle,
  PerfumeName,
  KeywordArea,
  AreaTitle,
  KeywordCellArea,
  KeywordCell,
  AddCell,
  ReviewArea,
  QuestionRow,
  Question,
  AnswerRow,
  Answer,
  DetailReviewRow,
  DetailReviewAnswer,
  UploadButton,
} from './styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../api';
import Header from '../../components/Header/index';
import KeywordModal from './KeywordModal';
import Search from '../../components/Search';
import {
  WriteReviewKeywordType,
  WriteReviewPerfumeDetailGroup,
} from '../../common/types';
import useApi from '../../hooks/useApi';

const WriteReview = () => {
  const navigate = useNavigate();
  const {
    data: checkToken,
    loading: checkTokenLoading,
    error: checkTokenError,
    fetchApi: fetchCheckToken,
  } = useApi<any>();
  const {
    data: perfumeDetail,
    loading: perfumeDetailLoading,
    error: perfumeDetailError,
    fetchApi: fetchPerfumeDetail,
  } = useApi<WriteReviewPerfumeDetailGroup>();
  const {
    data: keywordList,
    loading: keywordListLoading,
    error: keywordListError,
    fetchApi: fetchKeywordList,
  } = useApi<any>();
  const {
    data: postReview,
    loading: postReviewLoading,
    error: postReviewError,
    fetchApi: fetchPostReview,
  } = useApi<any>();

  const [myToken, setMyToken] = useState<string | null>();
  const [querySearch, setQuerySearch] = useSearchParams();
  const [perfumeId, setPerfumeId] = useState<number | null | undefined>();
  // const [perfumeDetail, setPerfumeDetail] = useState<WriteReviewPerfumeDetailGroup>();
  const [fragranceWheelKeywords, setFragranceWheelKeywords] = useState<
    WriteReviewKeywordType[]
  >([]);
  const [moodKeywords, setMoodKeywords] = useState<WriteReviewKeywordType[]>(
    []
  );
  const [placeKeywords, setPlaceKeywords] = useState<WriteReviewKeywordType[]>(
    []
  );
  const [keywordTagsArray, setKeywordTagsArray] = useState<
    WriteReviewKeywordType[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalBackground = useRef<HTMLDivElement>(null);
  const [rating, setRating] = useState<number>();
  const [longevity, setLongevity] = useState<number>();
  const [sillage, setSillage] = useState<number>();
  const [season, setSeason] = useState<number>();
  const [content, setContent] = useState<string>();
  const token = localStorage.getItem('my-token');

  const goToPerfumeDetail = () => {
    navigate('/perfumedetail?perfume=' + perfumeId);
  };

  const goToLogin = () => {
    alert('로그인이 필요합니다.');
    navigate('/login');
  };

  /*
   * 토큰 유효성 검사 api를 호출합니다.
   * @author 김민지
   */
  const validateToken = useCallback(async () => {
    let perfumeIdProps: null | string | number = querySearch.get('perfume');
    if (perfumeIdProps !== null) {
      perfumeIdProps = parseInt(perfumeIdProps);
      setPerfumeId(perfumeIdProps);
    }
    if (token && token.length > 0) {
      const res = await fetchCheckToken('post', '/token-validation', {});
      if (res?.length > 0) {
        setMyToken(token);
      } else if (checkTokenError) {
        goToLogin();
      }
    } else {
      goToLogin();
    }
  }, [token]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  /*
   * 시향 후기 작성 post api를 호출합니다.
   * @author 김민지
   */
  const uploadReview = async () => {
    if (!myToken || myToken.length <= 0) {
      alert('로그인이 필요합니다');
      goToLogin();
    }
    if (
      !perfumeId ||
      !rating ||
      !longevity ||
      !sillage ||
      !season ||
      !content ||
      keywordTagsArray.length <= 0
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const ptagIdsArray: number[] = [];
    keywordTagsArray.map((el) => ptagIdsArray.push(el?.id));
    const data = {
      perfumeId: perfumeId,
      rating: rating,
      longevity: longevity,
      sillage: sillage,
      season: season,
      content: content,
      ptagIds: ptagIdsArray,
    };
    const res = await fetchPostReview('post', '/review/', data);
    if (res) {
      alert('시향 후기가 등록되었습니다.');
      goToPerfumeDetail();
    } else {
      alert('시향 후기가 정상적으로 등록되지 않았습니다. 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    if (perfumeId && myToken) {
      /* 향수 이름, 브랜드, 이미지 get api */
      fetchPerfumeDetail('get', '/fullinfo/' + perfumeId);
      /* 향수 세포 키워드 get api */
      fetchKeywordList('get', '/perfumes/recommend/tpo');
    }
  }, [myToken]);

  useEffect(() => {
    if (keywordList !== undefined) {
      const fragranceWheelKeywordsArray: WriteReviewKeywordType[] = [];
      const moodKeywordsArray: WriteReviewKeywordType[] = [];
      const placeArray: WriteReviewKeywordType[] = [];
      keywordList.map((el: WriteReviewKeywordType) =>
        el.ptagtype_id === 1
          ? fragranceWheelKeywordsArray.push(el)
          : el.ptagtype_id === 2
            ? moodKeywordsArray.push(el)
            : placeArray.push(el)
      );
      setFragranceWheelKeywords(fragranceWheelKeywordsArray);
      setMoodKeywords(moodKeywordsArray);
      setPlaceKeywords(placeArray);
    }
  }, [keywordList]);

  /* 모달 외 영역 클릭 시 마우스 이벤트 감지하여 모달 닫기 */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        modalBackground.current &&
        !modalBackground.current.contains(e.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [modalBackground]);

  return (
    <>
      {isModalOpen === true ? (
        <KeywordModal
          fragranceWheelKeywords={fragranceWheelKeywords}
          moodKeywords={moodKeywords}
          placeKeywords={placeKeywords}
          keywordTagsArray={keywordTagsArray}
          setKeywordTagsArray={setKeywordTagsArray}
          ModalBackground={modalBackground}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          myToken={myToken}
        />
      ) : null}
      <Container>
        <Header />
        <Search />

        <Main>
          <PageTitle>후기 작성</PageTitle>
          <PerfumeInformationArea>
            <PerfumeImage src={perfumeDetail?.perfumeImage} />
            <PerfumeInformation>
              <BrandNameKR>{perfumeDetail?.brandName_kr}</BrandNameKR>
              <PerfumeName>{perfumeDetail?.perfumeName}</PerfumeName>
            </PerfumeInformation>
          </PerfumeInformationArea>

          <KeywordArea>
            <AreaTitle>향수 키워드</AreaTitle>
            <KeywordCellArea>
              {keywordTagsArray?.map((el) => (
                <KeywordCell key={el?.id}>{el?.ptag_kr}</KeywordCell>
              ))}
              <AddCell onClick={() => setIsModalOpen(true)}>
                # 키워드추가
              </AddCell>
            </KeywordCellArea>
          </KeywordArea>

          <ReviewArea>
            <QuestionRow>
              <Question>마음에 드는 향수였나요?</Question>
              <AnswerRow>
                <Answer
                  onClick={() => setRating(5)}
                  style={{
                    backgroundColor: rating === 5 ? '#E3A6A1' : 'white',
                    color: rating === 5 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  5점
                </Answer>
                <Answer
                  onClick={() => setRating(4)}
                  style={{
                    backgroundColor: rating === 4 ? '#E3A6A1' : 'white',
                    color: rating === 4 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  4점
                </Answer>
                <Answer
                  onClick={() => setRating(3)}
                  style={{
                    backgroundColor: rating === 3 ? '#E3A6A1' : 'white',
                    color: rating === 3 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  3점
                </Answer>
                <Answer
                  onClick={() => setRating(2)}
                  style={{
                    backgroundColor: rating === 2 ? '#E3A6A1' : 'white',
                    color: rating === 2 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  2점
                </Answer>
                <Answer
                  onClick={() => setRating(1)}
                  style={{
                    backgroundColor: rating === 1 ? '#E3A6A1' : 'white',
                    color: rating === 1 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  1점
                </Answer>
              </AnswerRow>
            </QuestionRow>
            <QuestionRow>
              <Question>지속력은 어느 정도인가요?</Question>
              <AnswerRow>
                <Answer
                  onClick={() => setLongevity(1)}
                  style={{
                    backgroundColor: longevity === 1 ? '#E3A6A1' : 'white',
                    color: longevity === 1 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  1h
                </Answer>
                <Answer
                  onClick={() => setLongevity(2)}
                  style={{
                    backgroundColor: longevity === 2 ? '#E3A6A1' : 'white',
                    color: longevity === 2 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  2h
                </Answer>
                <Answer
                  onClick={() => setLongevity(3)}
                  style={{
                    backgroundColor: longevity === 3 ? '#E3A6A1' : 'white',
                    color: longevity === 3 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  3h
                </Answer>
                <Answer
                  onClick={() => setLongevity(4)}
                  style={{
                    backgroundColor: longevity === 4 ? '#E3A6A1' : 'white',
                    color: longevity === 4 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  4h
                </Answer>
                <Answer
                  onClick={() => setLongevity(5)}
                  style={{
                    backgroundColor: longevity === 5 ? '#E3A6A1' : 'white',
                    color: longevity === 5 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  5h
                </Answer>
              </AnswerRow>
            </QuestionRow>
            <QuestionRow>
              <Question>확산력은 어느 정도인가요?</Question>
              <AnswerRow>
                <Answer
                  onClick={() => setSillage(1)}
                  style={{
                    backgroundColor: sillage === 1 ? '#E3A6A1' : 'white',
                    color: sillage === 1 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  1
                </Answer>
                <Answer
                  onClick={() => setSillage(2)}
                  style={{
                    backgroundColor: sillage === 2 ? '#E3A6A1' : 'white',
                    color: sillage === 2 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  2
                </Answer>
                <Answer
                  onClick={() => setSillage(3)}
                  style={{
                    backgroundColor: sillage === 3 ? '#E3A6A1' : 'white',
                    color: sillage === 3 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  3
                </Answer>
                <Answer
                  onClick={() => setSillage(4)}
                  style={{
                    backgroundColor: sillage === 4 ? '#E3A6A1' : 'white',
                    color: sillage === 4 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  4
                </Answer>
                <Answer
                  onClick={() => setSillage(5)}
                  style={{
                    backgroundColor: sillage === 5 ? '#E3A6A1' : 'white',
                    color: sillage === 5 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  5
                </Answer>
              </AnswerRow>
            </QuestionRow>
            <QuestionRow>
              <Question>어떤 계절에 어울리는 향수인가요?</Question>
              <AnswerRow>
                <Answer
                  onClick={() => setSeason(36)}
                  style={{
                    backgroundColor: season === 36 ? '#E3A6A1' : 'white',
                    color: season === 36 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  봄
                </Answer>
                <Answer
                  onClick={() => setSeason(37)}
                  style={{
                    backgroundColor: season === 37 ? '#E3A6A1' : 'white',
                    color: season === 37 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  여름
                </Answer>
                <Answer
                  onClick={() => setSeason(38)}
                  style={{
                    backgroundColor: season === 38 ? '#E3A6A1' : 'white',
                    color: season === 38 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  가을
                </Answer>
                <Answer
                  onClick={() => setSeason(39)}
                  style={{
                    backgroundColor: season === 39 ? '#E3A6A1' : 'white',
                    color: season === 39 ? '#FFFFFF' : '#B3B3B3',
                  }}
                >
                  겨울
                </Answer>
              </AnswerRow>
            </QuestionRow>

            <DetailReviewRow>
              <Question
                style={{
                  width: 'fit-content',
                  marginRight: 'auto',
                  marginLeft: '0px',
                }}
              >
                상세한 시향 후기를 작성해주세요!
              </Question>
              <DetailReviewAnswer
                onChange={(e: any) => setContent(e?.target?.value)}
                placeholder="어떤 착장과 잘 어울리는지, 어떤 이미지가 연상되는지 알려주세요!"
              />
            </DetailReviewRow>
          </ReviewArea>
          <UploadButton onClick={() => uploadReview()}>등록</UploadButton>
        </Main>
      </Container>
    </>
  );
};

export default WriteReview;
