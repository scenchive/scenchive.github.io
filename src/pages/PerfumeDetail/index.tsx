import React, { useEffect, useState } from "react";
import {
  Container,
  Main,
  PerfumeArea,
  PerfumeImageArea,
  PerfumeImage,
  Bookmark,
  MobilePerfumeInformationArea,
} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/index";
import Search from "../../components/Search/index";
import PerfumeRatingBlock from "./PerfumeRatingBlock/index";
import ShoppingInformationTab from "./ShoppingInformationTab";
import NoteInformationBlock from "./NoteInformationBlock";
import ReviewBlock from "./ReviewBlock";
import useApi from "../../hooks/useApi";
import {
  PerfumeDetailGroup,
  PerfumeRatingGroup,
  PerfumeNoteGroup,
  ReviewInformation,
  ShoppingInformation,
} from "../../common/types";
import MobileBrandPerfumeInformation from "./MobileBrandInformation";
import PerfumeInformation from "./PerfumeInformation";

const PerfumeDetail = () => {
  const navigate = useNavigate();

  /**
   * useApi 커스텀 훅을 사용하여 데이터를 get, post, delete하는 작업과 관련된 변수들입니다.
   *  @author 김민지
   */
  const {
    data: checkToken,
    loading: checkTokenLoading,
    error: checkTokenError,
    fetchApi: fetchCheckToken,
  } = useApi<any>();
  const {
    data: perfumeDetail,
    loading: detailLoading,
    error: detailError,
    fetchApi: fetchPerfumeDetail,
  } = useApi<PerfumeDetailGroup>();
  const {
    data: perfumeRating,
    loading: perfumeRatingLoading,
    error: perfumeRatingError,
    fetchApi: fetchPerfumeRating,
  } = useApi<PerfumeRatingGroup>();
  const {
    data: perfumeNote,
    loading: perfumeNoteLoading,
    error: perfumeNoteError,
    fetchApi: fetchPerfumeNote,
  } = useApi<PerfumeNoteGroup | null | undefined>();
  const {
    data: reviewData,
    loading: reviewLoading,
    error: reviewError,
    fetchApi: fetchReview,
  } = useApi<ReviewInformation[]>();
  const {
    data: bookmarkData,
    loading: bookmarkLoading,
    error: bookmarkError,
    fetchApi: fetchBookmark,
  } = useApi<any>();
  const {
    data: postBookmark,
    loading: postBookmarkLoading,
    error: postBookmarkError,
    fetchApi: fetchPostBookmark,
  } = useApi<any>();
  const {
    data: deleteBookmark,
    loading: deleteBookmarkLoading,
    error: deleteBookmarkError,
    fetchApi: fetchDeleteBookmark,
  } = useApi<string>();
  const {
    data: shoppingList,
    loading: shoppingListLoading,
    error: shoppingListError,
    fetchApi: fetchShoppingList,
  } = useApi<ShoppingInformation[] | null | undefined>();

  const [myToken, setMyToken] = useState<string | null>();
  const [querySearch, setQuerySearch] = useSearchParams();
  const [perfumeId, setPerfumeId] = useState<number | null | undefined>();
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  const [isBookmark, setIsBookmark] = useState<boolean>();
  const [reveiwTotal, setReviewTotal] = useState<number>();
  const [reviewList, setReviewList] = useState<ReviewInformation[]>();
  let token = localStorage.getItem("my-token");

  const goToLogin = () => {
    alert("로그인이 필요합니다.");
    navigate("/login");
  };

  /* 향수 북마크 설정/삭제 api */
  const handleBookmark = async () => {
    if (perfumeId !== undefined && myToken) {
      if (isBookmark === false) {
        try {
          const data = await fetchPostBookmark(
            "post",
            "/bookmark?perfumeId=" + perfumeId,
            {}
          );
          if (data?.perfumeId === perfumeId) {
            setIsBookmark(true);
          }
        } catch (postBookmarkError) {
          console.log(postBookmarkError);
        }
      } else {
        try {
          const data = await fetchDeleteBookmark(
            "delete",
            "/bookmark?perfumeId=" + perfumeId,
            {}
          );
          if (data === "북마크 해제되었습니다.") {
            setIsBookmark(false);
          }
        } catch (deleteBookmarkError) {
          console.log(deleteBookmarkError);
        }
      }
    } else {
      goToLogin();
    }
  };

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
      setRatesResArr(tempStarRatesArr);
    }
  };

  /* 토큰 유효성 검사 호출 api */
  useEffect(() => {
    let perfumeIdProps: null | string | number = querySearch.get("perfume");
    if (perfumeIdProps !== null && perfumeIdProps !== "") {
      perfumeIdProps = parseInt(perfumeIdProps);
      setPerfumeId(perfumeIdProps);
    } else {
      navigate("*");
    }

    if (token && token?.length > 0) {
      fetchCheckToken("post", "/token-validation", {});
    }
  }, []);

  useEffect(() => {
    if (checkToken?.length > 0) {
      setMyToken(token);
    } else if (checkTokenError) {
    }
  }, [checkToken]);

  useEffect(() => {
    const fetchBookmarkData = async () => {
      if (perfumeId && myToken) {
        try {
          await fetchBookmark("get", "/checkmarked?perfumeId=" + perfumeId, {});
          if (bookmarkData === "이미 북마크한 향수입니다.") {
            setIsBookmark(true);
          } else if (bookmarkData === "북마크한 향수가 아닙니다.") {
            setIsBookmark(false);
          }
        } catch (bookmarkError) {
          console.log(bookmarkError);
        }
      }
    };
    fetchBookmarkData();
  }, [myToken, perfumeId, bookmarkData]);

  useEffect(() => {
    if (perfumeId) {
      fetchPerfumeDetail("get", "/fullinfo/" + perfumeId, {});
      fetchPerfumeRating("get", "/perfumerating/" + perfumeId, {});
      fetchPerfumeNote("get", "/notesinfo/" + perfumeId, {});
      fetchReview("get", "/reviews/" + perfumeId, {});
    }
  }, [perfumeId]);

  useEffect(() => {
    if (reviewData) {
      setReviewList(reviewData);
      setReviewTotal(reviewData?.length);
    }
  }, [reviewData]);

  useEffect(() => {
    if (perfumeDetail?.perfumeName) {
      fetchShoppingList(
        "get",
        `/product/search?query=` +
          `${perfumeDetail?.brandName_kr} ${perfumeDetail?.perfumeName}`,
        {}
      );
    }
  }, [perfumeDetail?.perfumeName]);

  useEffect(() => {
    if (perfumeRating?.ratingAvg !== undefined) {
      calcStarRates();
    }
  }, [perfumeRating]);

  return (
    <>
      <Container>
        <Header />
        <Search />
        <Main>
          <PerfumeArea>
            <MobileBrandPerfumeInformation
              perfumeDetail={perfumeDetail}
              ratesResArr={ratesResArr}
              perfumeRating={perfumeRating}
              reviewTotal={reveiwTotal}
            />
            <PerfumeImageArea>
              <PerfumeImage
                src={
                  perfumeDetail?.perfumeImage
                    ? perfumeDetail?.perfumeImage
                    : "/assets/icon/icon-perfume-pic.png"
                }
              />
              <Bookmark
                onClick={handleBookmark}
                src={
                  isBookmark === true
                    ? "/assets/icon/icon_bookmark_Y.svg"
                    : "/assets/icon/icon_bookmark_N.svg"
                }
              />
            </PerfumeImageArea>
            <PerfumeInformation
              perfumeDetail={perfumeDetail}
              ratesResArr={ratesResArr}
              perfumeRating={perfumeRating}
              reviewTotal={reveiwTotal}
            />
            <MobilePerfumeInformationArea>
              <PerfumeRatingBlock perfumeRating={perfumeRating} />
            </MobilePerfumeInformationArea>
          </PerfumeArea>
          <NoteInformationBlock PerfumeNote={perfumeNote} myToken={myToken} />
          <ShoppingInformationTab shoppingList={shoppingList} />
          <ReviewBlock PerfumeNote={perfumeNote} reviewList={reviewList} />
        </Main>
      </Container>
    </>
  );
};

export default PerfumeDetail;
