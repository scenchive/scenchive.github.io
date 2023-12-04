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
  PerfumeNameKR,
  PerfumeArea,
  PerfumeImage,
  PerfumeInformationArea,
  BrandNameKR,
  BrandNameEN,
  PerfumeRating,
  SeasonRatingArea,
  SeasonRating,
  OtherRatingArea,
  ButtonArea,
  MenuButton,

} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import BasicInformationTab from "./BasicInformationTab";
import ShoppingInformationTab from "./ShoppingInformationTab";


interface PerfumeDetailGroup {
  brandName: string;
  brandName_kr: string;
  id: number;
  perfumeImage: string;
  perfumeName: string;
}

interface PerfumeRatingGroup {
  perfumeId: number;
  ratingAvg: number;
  longetivityAvg: number;
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
  perfumeName:string;
  brandName:string;
  top:string[];
  middle:string[];
  base:string[];
}

interface ReviewInformation{
  name:string;
  content:string;
  created_at:string;
  imageUrl:string;
}

interface ShoppingInformation{
  cleanedTitle:string;
  link:string;
  image:string;
  lprice:number;
  mallName:string;
}

const PerfumeDetail = () => {
  const navigate = useNavigate();
  const [myToken, setMyToken] = useState<string | null>();
  const [querySearch, setQuerySearch] = useSearchParams();
  const [perfumeId, setPerfumeId] = useState<number | null | undefined>();
  const [perfumeName, setPerfumeName]=useState<string>();
  const [perfumeDetail, setPerfumeDetail] = useState<PerfumeDetailGroup>();
  const [perfumeRating, setPerfumeRating] = useState<PerfumeRatingGroup>();
  const [selectedMenu, setSelectedMenu] = useState<string>("기본 정보");
  const [perfumeNote, setPerfumeNote]=useState<PerfumeNoteGroup|null|undefined>();
  const [reviewList, setReviewList]=useState<ReviewInformation[]>();
  const [shoppingList, setShoppingList]=useState<ShoppingInformation[] | null | undefined>();

  const goToHome = () => {
    navigate("/")
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
          setPerfumeDetail(res.data);
          setPerfumeName(res.data.perfumeName)
        });
    }
  };

  /* 향수 전체평점, 계절 평점, 기타 평점 호출 api */
  const getPerfumeRating = async () => {
    if (perfumeId && myToken) {
      await axios.get(`/perfumerating/` + perfumeId, { headers: { Authorization: `Bearer ${myToken}` } })
        .then((res) => {
          setPerfumeRating(res.data);
        });
    }
  }

  /* 향수 노트 정보 호출 api, BasicInformationTab 컴포넌트에서 이용*/
  const getPerfumeNote = async () => {
    if (perfumeId && myToken) {
      await axios.get(`/notesinfo/` + perfumeId, { headers: { Authorization: `Bearer ${myToken}` } })
        .then((res) => {
          setPerfumeNote(res.data)
        });
    }
  }

  /* 시향 후기 호출 api */
  const getReview = async () => {
    if (perfumeId && myToken) {
      await axios.get(`/review/` + perfumeId, { headers: { Authorization: `Bearer ${myToken}` } })
        .then((res) => {
          setReviewList(res?.data)
        });
    }
  }

  /* 구매 정보 호출 api */
  const getShopping = async () => {
    if (perfumeName && myToken) {
      await axios.get(`/product/search?query=`+perfumeName, { headers: { Authorization: `Bearer ${myToken}` } })
        .then((res) => {
          setShoppingList(res?.data)
        });
    }
  }

  useEffect(() => {
    getPerfumeDetail();
    getPerfumeRating();
    getPerfumeNote();
    getReview();
  }, [myToken])

  useEffect(()=>{
    getShopping();
  },[perfumeName])


  return (<>

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
        <PerfumeNameKR>{perfumeDetail?.perfumeName}</PerfumeNameKR>
        <PerfumeArea>
          <PerfumeImage src={perfumeDetail?.perfumeImage ? perfumeDetail?.perfumeImage : "/assets/icon/icon-perfume-pic.png"} />

          <PerfumeInformationArea>
            <BrandNameKR>
              {perfumeDetail?.brandName_kr}
            </BrandNameKR>
            <BrandNameEN>
              {perfumeDetail?.brandName}
            </BrandNameEN>
            <PerfumeRating>
              {perfumeRating?.ratingAvg}
            </PerfumeRating>
            <SeasonRatingArea>
              <SeasonRating>{perfumeRating?.seasonAvg?.spring}%</SeasonRating>
              <SeasonRating>{perfumeRating?.seasonAvg?.summer}%</SeasonRating>
              <SeasonRating>{perfumeRating?.seasonAvg?.fall}%</SeasonRating>
              <SeasonRating>{perfumeRating?.seasonAvg?.winter}%</SeasonRating>
            </SeasonRatingArea>
            <OtherRatingArea>
              {perfumeRating?.longetivityAvg}
              {perfumeRating?.sillageAvg}
            </OtherRatingArea>
          </PerfumeInformationArea>
        </PerfumeArea>
        <ButtonArea>
          <MenuButton onClick={() => setSelectedMenu("기본 정보")} style={{ backgroundColor: selectedMenu === "기본 정보" ? "#A281FF" : "#E6E4FF" }}>기본 정보</MenuButton>
          <MenuButton onClick={() => setSelectedMenu("구매 정보")} style={{ backgroundColor: selectedMenu === "구매 정보" ? "#A281FF" : "#E6E4FF" }}>구매 정보</MenuButton>
        </ButtonArea>
        {
          selectedMenu==="기본 정보"? 
          <BasicInformationTab PerfumeNote={perfumeNote} myToken={myToken} reviewList={reviewList}/> 
          : <ShoppingInformationTab shoppingList={shoppingList}/>
        }
      </ContentArea>
    </Container>
  </>
  );
};

export default PerfumeDetail;
