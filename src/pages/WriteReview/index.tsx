import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderText,
  Title,
  Menu,
  MenuList,
  ContentArea,
  PerfumeArea,
  PerfumeImage,
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

} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import KeywordModal from "./KeywordModal";



interface PerfumeDetailGroup {
  brandName: string;
  brandName_kr: string;
  id: number;
  perfumeImage: string;
  perfumeName: string;
}


interface KeywordType {
  id: number;
  ptag: string;
  ptag_kr: string;
  ptagtype_id: number;
}


const WriteReview = () => {
  const navigate = useNavigate();
  const [myToken, setMyToken] = useState<string | null>();
  const [querySearch, setQuerySearch] = useSearchParams();
  const [perfumeId, setPerfumeId] = useState<number | null | undefined>();
  const [perfumeDetail, setPerfumeDetail] = useState<PerfumeDetailGroup>();
  const [fragranceWheelKeywords, setFragranceWheelKeywords] = useState<KeywordType[]>([]);
  const [moodKeywords, setMoodKeywords] = useState<KeywordType[]>([]);
  const [placeKeywords, setPlaceKeywords] = useState<KeywordType[]>([]);
  const [keywordTagsArray, setKeywordTagsArray] = useState<KeywordType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalBackground = useRef<HTMLDivElement>(null);

  const [rating, setRating] = useState<number>();
  const [longevity, setLongevity] = useState<number>();
  const [sillage, setSillage] = useState<number>();
  const [season, setSeason] = useState<number>();
  const [content, setContent] = useState<string>();
  const [ptagIds, setPtagIds] = useState<KeywordType[]>();

  const goToHome = () => {
    navigate("/")
  }

  const goToPerfumeDetail = () => {
    navigate("/perfumedetail?perfume=" + perfumeId)

  }

  const goToLogin = () => {
    navigate("/login")
  }

  useEffect(() => {
    let perfumeIdProps: null | string | number = querySearch.get("perfume")
    if (perfumeIdProps !== null) {
      perfumeIdProps = parseInt(perfumeIdProps);
      setPerfumeId(perfumeIdProps)
    }
    let token = localStorage.getItem('my-token');
    if (token && token.length > 0) {
      axios.post('/token-validation', {}, { headers: { 'Authorization': `Bearer ${token}` } })
        .then((res) => {
          if (res.data.length > 0) {
            setMyToken(token);
          } else {
            goToLogin();
          }
        })
        .catch((err) => {
          goToLogin();
        })
    } else {
      goToLogin();
    }
  }, [])


  /* 향수 이름, 브랜드, 이미지 호출 api */
  const getPerfumeDetail = async () => {
    if (perfumeId && myToken) {
      await axios.get(`/fullinfo/` + perfumeId, { headers: { Authorization: `Bearer ${myToken}` } })
        .then((res) => {
          setPerfumeDetail(res.data)
        });
    }
  };

  // 향수 세포 키워드 가져오는 api
  const getKeywordList = () => {
    if (myToken && myToken.length > 0) {
      axios.get('/perfumes/recommend/tpo', { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          let fragranceWheelKeywordsArray: KeywordType[] = [];
          let moodKeywordsArray: KeywordType[] = [];
          let placeArray: KeywordType[] = [];
          res.data.map((el: KeywordType) => el.ptagtype_id === 1 ? fragranceWheelKeywordsArray.push(el) : el.ptagtype_id === 2 ? moodKeywordsArray.push(el) : placeArray.push(el))
          setFragranceWheelKeywords(fragranceWheelKeywordsArray);
          setMoodKeywords(moodKeywordsArray);
          setPlaceKeywords(placeArray)
        }).catch((res) => {
          console.log(res)
        })
    }
  }

  // 시향 후기 작성 api
  const uploadReview = () => {
    if (perfumeId && rating && longevity && sillage && season && content && keywordTagsArray.length > 0) {
      let ptagIdsArray: number[] = [];
      keywordTagsArray.map((el) => ptagIdsArray.push(el?.id))
      let data = {
        perfumeId: perfumeId,
        rating: rating,
        longevity: longevity,
        sillage: sillage,
        season: season,
        content: content,
        ptagIds: ptagIdsArray,
      }
      console.log('dataaa')
      console.log(data)
      if (myToken && myToken.length > 0) {
        axios.post('/review/', data,{ headers: { 'Authorization': `Bearer ${myToken}` } })
          .then((res) => {
            console.log('res', res)
            goToPerfumeDetail();
          }).catch((res) => {
            console.log(res)
          })
      }
    } else {
      alert("모든 항목을 입력해주세요.")
    }
  }


  useEffect(() => {
    getPerfumeDetail();
    getKeywordList();
  }, [myToken])


  /* 모달 외 영역 클릭 시 마우스 이벤트 감지하여 모달 닫기 */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalBackground.current && !modalBackground.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [modalBackground])


  return (<>
    {isModalOpen === true ?
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
      : null}
    <Container>
      <Header>
        <HeaderLeft>
          <Title>
            <div className="title__kr">센카이브</div>
            <div className="title__en">Scenchive</div>
          </Title>
          <Menu>
            <MenuList>마이페이지</MenuList>
            <MenuList>필터 추천</MenuList>
            <MenuList>게시판</MenuList>
          </Menu>
        </HeaderLeft>
        <HeaderRight>
          {!myToken ? (
            <>
              <HeaderText onClick={() => navigate("/login")}>로그인</HeaderText>
              <HeaderText>|</HeaderText>
              <HeaderText onClick={() => navigate("/signupstep1")}>
                회원가입
              </HeaderText>
            </>
          ) : (
            <img src="/assets/icon/icon_notice.svg" />
          )}
        </HeaderRight>
      </Header>
      <ContentArea>
        <PageTitle>후기 작성</PageTitle>
        <PerfumeArea>
          <PerfumeImage src={perfumeDetail?.perfumeImage} />
          <BrandNameKR>{perfumeDetail?.brandName_kr}</BrandNameKR>
          <PerfumeName>{perfumeDetail?.perfumeName}</PerfumeName>
        </PerfumeArea>

        <KeywordArea>
          <AreaTitle>향수 키워드</AreaTitle>
          <KeywordCellArea>

            {keywordTagsArray?.map((el) => <KeywordCell key={el?.id}>{el?.ptag_kr}</KeywordCell>)}
            <AddCell onClick={() => setIsModalOpen(true)}># 키워드추가</AddCell>
          </KeywordCellArea>
        </KeywordArea>

        <ReviewArea>
          <QuestionRow>
            <Question>마음에 드는 향수였나요?</Question>
            <AnswerRow>
              <Answer onClick={() => setRating(5)} style={{ backgroundColor: rating === 5 ? "blue" : "white" }}>5점</Answer>
              <Answer onClick={() => setRating(4)} style={{ backgroundColor: rating === 4 ? "blue" : "white" }}>4점</Answer>
              <Answer onClick={() => setRating(3)} style={{ backgroundColor: rating === 3 ? "blue" : "white" }}>3점</Answer>
              <Answer onClick={() => setRating(2)} style={{ backgroundColor: rating === 4 ? "blue" : "white" }}>2점</Answer>
              <Answer onClick={() => setRating(1)} style={{ backgroundColor: rating === 1 ? "blue" : "white" }}>1점</Answer>

            </AnswerRow>
          </QuestionRow>
          <QuestionRow>
            <Question>지속력은 어느 정도인가요?</Question>
            <AnswerRow>
              <Answer onClick={() => setLongevity(1)} style={{ backgroundColor: longevity === 1 ? "blue" : "white" }}>1h</Answer>
              <Answer onClick={() => setLongevity(2)} style={{ backgroundColor: longevity === 2 ? "blue" : "white" }}>2h</Answer>
              <Answer onClick={() => setLongevity(3)} style={{ backgroundColor: longevity === 3 ? "blue" : "white" }}>3h</Answer>
              <Answer onClick={() => setLongevity(4)} style={{ backgroundColor: longevity === 4 ? "blue" : "white" }}>4h</Answer>
              <Answer onClick={() => setLongevity(5)} style={{ backgroundColor: longevity === 5 ? "blue" : "white" }}>5h</Answer>
            </AnswerRow>
          </QuestionRow>
          <QuestionRow>
            <Question>확산력은 어느 정도인가요?</Question>
            <AnswerRow>
              <Answer onClick={() => setSillage(1)} style={{ backgroundColor: sillage === 1 ? "blue" : "white" }}>1</Answer>
              <Answer onClick={() => setSillage(2)} style={{ backgroundColor: sillage === 2 ? "blue" : "white" }}>2</Answer>
              <Answer onClick={() => setSillage(3)} style={{ backgroundColor: sillage === 3 ? "blue" : "white" }}>3</Answer>
              <Answer onClick={() => setSillage(4)} style={{ backgroundColor: sillage === 4 ? "blue" : "white" }}>4</Answer>
              <Answer onClick={() => setSillage(5)} style={{ backgroundColor: sillage === 5 ? "blue" : "white" }}>5</Answer>

            </AnswerRow>
          </QuestionRow>
          <QuestionRow>
            <Question>어떤 계절에 어울리는 향수인가요?</Question>
            <AnswerRow>
              <Answer onClick={() => setSeason(36)} style={{ backgroundColor: season === 36 ? "blue" : "white" }}>봄</Answer>
              <Answer onClick={() => setSeason(37)} style={{ backgroundColor: season === 37 ? "blue" : "white" }}>여름</Answer>
              <Answer onClick={() => setSeason(38)} style={{ backgroundColor: season === 38 ? "blue" : "white" }}>가을</Answer>
              <Answer onClick={() => setSeason(39)} style={{ backgroundColor: season === 39 ? "blue" : "white" }}>겨울</Answer>
            </AnswerRow>
          </QuestionRow>

          <DetailReviewRow>
            <Question>상세한 시향 후기를 작성해주세요!</Question>
            <DetailReviewAnswer onChange={(e: any) => setContent(e?.target?.value)} placeholder="어떤 착장과 잘 어울리는지, 어떤 이미지가 연상되는지 알려주세요!" />
          </DetailReviewRow>
        </ReviewArea>
        <UploadButton onClick={() => uploadReview()}>등록</UploadButton>

      </ContentArea>
    </Container>
  </>
  );
};

export default WriteReview;
