import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Main,
  PerfumeNameKR,
  PerfumeArea,
  MobileBrandPerfumeInformationArea,
  PerfumeImageArea,
  PerfumeImage,
  Bookmark,
  PerfumeInformationArea,
  BrandArea,
  BrandNameKR,
  BrandDetailPageIcon,
  BrandNameEN,
  PerfumeRating,
  MobilePerfumeInformationArea,
  ButtonArea,
  MenuButton,

} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import {api} from "../../api";
import Header from "../../components/Header/index";
import Search from "../../components/Search/index";
import StarRating from "./StarRating/index";
import PerfumeRatingBlock from "./PerfumeRatingBlock/index";
import BasicInformationTab from "./NoteInformationBlock";
import ShoppingInformationTab from "./ShoppingInformationTab";
import NoteInformationBlock from "./NoteInformationBlock";
import ReviewBlock from "./ReviewBlock";


interface PerfumeDetailGroup {
  brandName: string;
  brandName_kr: string;
  id: number;
  perfumeImage: string;
  perfumeName: string;
  brandImage: string;
}

interface PerfumeRatingGroup {
  perfumeId: number;
  ratingAvg: number;
  longevityAvg: number;
  sillageAvg: number;
  seasonAvg: {
    spring: number;
    summer: number;
    fall: number;
    winter: number;
  }
}

interface PerfumeNoteGroup {
  perfumeId: number;
  perfumeName: string;
  brandName: string;
  top: string[];
  middle: string[];
  base: string[];
}

interface ReviewInformation {
  name: string;
  content: string;
  created_at: string;
  imageUrl: string;
}

interface ShoppingInformation {
  cleanedTitle: string;
  link: string;
  image: string;
  lprice: number;
  mallName: string;
}

const PerfumeDetail = () => {
  const navigate = useNavigate();
  const [myToken, setMyToken] = useState<string | null>();
  const [querySearch, setQuerySearch] = useSearchParams();
  const [perfumeId, setPerfumeId] = useState<number | null | undefined>();
  const [perfumeName, setPerfumeName] = useState<string>();
  const [perfumeDetail, setPerfumeDetail] = useState<PerfumeDetailGroup>();
  const [perfumeRating, setPerfumeRating] = useState<PerfumeRatingGroup>();
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  const [isBookmark, setIsBookmark] = useState<boolean>();
  const [reveiwTotal, setReviewTotal] = useState<string>();
  const [selectedMenu, setSelectedMenu] = useState<string>("기본 정보");
  const [perfumeNote, setPerfumeNote] = useState<PerfumeNoteGroup | null | undefined>();
  const [reviewList, setReviewList] = useState<ReviewInformation[]>();
  const [shoppingList, setShoppingList] = useState<ShoppingInformation[] | null | undefined>();

  const goToHome = () => {
    navigate("/")
  }

  const goToLogin = () => {
    navigate("/login")
  }


  /* 토큰 유효성 검사 호출 api */
  useEffect(() => {
    let perfumeIdProps: null | string | number = querySearch.get("perfume")
    if (perfumeIdProps !== null && perfumeIdProps !== "") {
      perfumeIdProps = parseInt(perfumeIdProps);
      setPerfumeId(perfumeIdProps)
    } else {
      navigate('/notfound')
    }
    let token = localStorage.getItem('my-token');
    if (token && token.length > 0) {
      api.post('/token-validation', {}, { headers: { 'Authorization': `Bearer ${token}` } })
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
      await api.get(`/fullinfo/` + perfumeId, { headers: { Authorization: `Bearer ${myToken}` } })
        .then((res) => {
          setPerfumeDetail(res.data);
          setPerfumeName(res.data.perfumeName)
        });
    }
  };

  /* 향수 북마크 유무 확인 api */
  const getBookmark = async () => {
    if (perfumeId && myToken) {
      await api.get(`/checkmarked?perfumeId=` + perfumeId, { headers: { Authorization: `Bearer ${myToken}` } })
        .then((res) => {
          if (res.data === "이미 북마크한 향수입니다.") {
            setIsBookmark(true);
          } else if (res.data === "북마크한 향수가 아닙니다.") {
            setIsBookmark(false);
          }
        });
    }
  };

  /* 향수 북마크 설정/삭제 api */
  const handleBookmark = () => {
    if (perfumeId && myToken) {
      if (isBookmark === false) {
        api.post(`/bookmark?perfumeId=` + perfumeId, {}, { headers: { Authorization: `Bearer ${myToken}` } })
          .then((res) => {
            setIsBookmark(true);

          });
      } else {
        api.delete(`/bookmark?perfumeId=` + perfumeId, { headers: { Authorization: `Bearer ${myToken}` } })
          .then((res) => {
            setIsBookmark(false);
          });
      }
    }
  }


  /* 향수 전체평점, 계절 평점, 기타 평점 호출 api */
  const getPerfumeRating = async () => {
    if (perfumeId && myToken) {
      await api.get(`/perfumerating/` + perfumeId, { headers: { Authorization: `Bearer ${myToken}` } })
        .then((res) => {
          setPerfumeRating(res.data);
        });
    }
  }

  /* 향수 전체평점 기반 별점 계산 */
  const calcStarRates = () => {
    if (perfumeRating?.ratingAvg !== undefined) {
      let tempStarRatesArr = [0, 0, 0, 0, 0];
      let starVerScore = (perfumeRating?.ratingAvg * 20 * 90) / 100;
      let idx = 0;
      while (starVerScore > 18) {
        tempStarRatesArr[idx] = 18;
        idx += 1;
        starVerScore -= 18;
      }
      tempStarRatesArr[idx] = starVerScore;
      setRatesResArr(tempStarRatesArr)

    }
  };

  /* 향수 노트 정보 호출 api, BasicInformationTab 컴포넌트에서 이용*/
  const getPerfumeNote = async () => {
    if (perfumeId && myToken) {
      await api.get(`/notesinfo/` + perfumeId, { headers: { Authorization: `Bearer ${myToken}` } })
        .then((res) => {
          setPerfumeNote(res.data)
        });
    }
  }

  /* 시향 후기 호출 api */
  const getReview = async () => {
    if (perfumeId && myToken) {
      await api.get(`/review/` + perfumeId, { headers: { Authorization: `Bearer ${myToken}` } })
        .then((res) => {
          setReviewList(res?.data)
          setReviewTotal(res.data.length)
        });
    }
  }

  /* 구매 정보 호출 api */
  const getShopping = async () => {
    if (perfumeName && myToken) {
      await api.get(`/product/search?query=` + perfumeName, { headers: { Authorization: `Bearer ${myToken}` } })
        .then((res) => {
          setShoppingList(res?.data)
        });
    }
  }

  useEffect(() => {
    getPerfumeDetail();
    getBookmark();
    getPerfumeRating();
    getPerfumeNote();
    getReview();
  }, [myToken])

  useEffect(() => {
    getShopping();
  }, [perfumeName])

  useEffect(() => {
    if (perfumeRating?.ratingAvg !== undefined) {
      calcStarRates();
    }
  }, [perfumeRating])


  return (<>

    <Container>
      <Header />
      <Search />

      <Main>
        <PerfumeArea>
          <MobileBrandPerfumeInformationArea>
            <BrandArea
              onClick={() =>
                navigate(`/branddetail?name=${perfumeDetail?.brandName}`, {
                  state: {
                    brandName_kr: perfumeDetail?.brandName_kr,
                    brandImage: perfumeDetail?.brandImage,
                  },
                })}
            >
              <BrandNameKR>
                {perfumeDetail?.brandName_kr} ( {perfumeDetail?.brandName})
              </BrandNameKR>
              <BrandDetailPageIcon src={"/assets/icon/icon_brand_page.svg"} />
            </BrandArea>
            <PerfumeNameKR>{perfumeDetail?.perfumeName}</PerfumeNameKR>
            <PerfumeRating>
              <StarRating ratesResArr={ratesResArr} /> {perfumeRating?.ratingAvg} ({reveiwTotal}건)
            </PerfumeRating>
          </MobileBrandPerfumeInformationArea>
          <PerfumeImageArea>
            <PerfumeImage src={perfumeDetail?.perfumeImage ? perfumeDetail?.perfumeImage : "/assets/icon/icon-perfume-pic.png"} />
            <Bookmark onClick={handleBookmark} src={isBookmark === true ? "/assets/icon/icon_bookmark_Y.svg" : "/assets/icon/icon_bookmark_N.svg"} />
          </PerfumeImageArea>

          <PerfumeInformationArea>
            <BrandArea
              onClick={() =>
                navigate(`/branddetail?name=${perfumeDetail?.brandName}`, {
                  state: {
                    brandName_kr: perfumeDetail?.brandName_kr,
                    brandImage: perfumeDetail?.brandImage,
                  },
                })}
            >
              <BrandNameKR>
                {perfumeDetail?.brandName_kr} ( {perfumeDetail?.brandName})
              </BrandNameKR>
              <BrandDetailPageIcon src={"/assets/icon/icon_brand_page.svg"} />
            </BrandArea>
            <PerfumeNameKR>{perfumeDetail?.perfumeName}</PerfumeNameKR>

            <PerfumeRating>
              <StarRating ratesResArr={ratesResArr} /> {perfumeRating?.ratingAvg} ({reveiwTotal}건)
            </PerfumeRating>

            <PerfumeRatingBlock perfumeRating={perfumeRating} />
          </PerfumeInformationArea>
          <MobilePerfumeInformationArea>
            <PerfumeRatingBlock perfumeRating={perfumeRating} />
          </MobilePerfumeInformationArea>
        </PerfumeArea>
        <NoteInformationBlock PerfumeNote={perfumeNote} myToken={myToken} />

        <ShoppingInformationTab shoppingList={shoppingList} />

        <ReviewBlock PerfumeNote={perfumeNote} myToken={myToken} reviewList={reviewList} />
      </Main>
    </Container>
  </>
  );
};

export default PerfumeDetail;
