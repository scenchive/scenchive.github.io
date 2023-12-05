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
  PageName,
  ProfileArea,
  ProfileImage,
  NameEmailArea,
  ChangeInfoButton,
  KeywordArea,
  KeywordAreaTitle,
  MyKeywordsArea,
  Keyword,
  TabButtonArea,
  BookmarkedTabButton,
  RecommendTabButton,

} from "./styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiService from "../../ApiServices";
import PerfumeCell from "./PerfumeCell";
import PerfumeCellModifyModal from "./PerfumeCellModifyModal";

interface KeywordType {
  id: number;
  utag: string;
  utag_kr: string;
  utagtype_id: number;
}


interface PerfumeType {
  perfume_id: number;
  perfume_name: string;
  perfumeImage: string;
  brand_name: string;
  brandName_kr: string;
}

const MyPage = () => {
  const navigate = useNavigate();
  const [myToken, setMyToken] = useState<string | null>();
  const [email, setEmail] = useState<string | null>();
  const [name, setName] = useState<string | null>();
  const [imageUrl, setImageUrl] = useState<string>("/assets/icon/icon-profile-picture.svg");
  const [userKeyword, setUserKeyword] = useState<KeywordType[]>();
  const [fragranceWheelKeywords, setFragranceWheelKeywords] = useState<KeywordType[]>([]);
  const [moodKeywords, setMoodKeywords] = useState<KeywordType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [clickedTabMenu, setClickedTabMenu] = useState<string>('북마크한 향수');
  const [bookmarkList, setBookmarkList] = useState<PerfumeType[]>();
  const [recommendList, setRecommendList] = useState<PerfumeType[]>();
  const modalBackground = useRef<HTMLDivElement>(null);

  /**
   * @todo 실제 로그인 여부 확인
   */
  const isLogin = false;

  const goToHome = () => {
    navigate("/")
  }

  const goToLogin = () => {
    navigate("/login")
  }


  useEffect(() => {
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


  // 프로필 데이터 가져오는 api
  const getUserProfile = () => {
    if (myToken && myToken.length > 0) {
      axios.get('/profile', { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          setEmail(res.data.email);
          setImageUrl(res.data.imageUrl);
          setName(res.data.name);
        }).catch((res) => {
          console.log(res)
          alert('로그인 후 이용 가능합니다.')
          goToHome();
        })
    }
  }

  // 유저 키워드 가져오는 api
  const getUserKeyword = () => {
    if (myToken && myToken.length > 0) {
      axios.get('/keyword', { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          if (res.data) {
            setUserKeyword(res.data);
          }
        }).catch((res) => {
          console.log(res)
          alert('로그인 후 이용 가능합니다.')
          goToHome();
        })
    }
  }

  // 북마크 목록 가져오는 api
  const getBookmarkList = () => {
    if (myToken && myToken.length > 0) {
      axios.get('/bookmark?page=0', { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          setBookmarkList(res.data.perfumes);
        }).catch((res) => {
          console.log(res)
        })
    }
  }

  // 맞춤 추천 향수 가져오는 api
  const getRecommendList = () => {
    if (myToken && myToken.length > 0) {
      axios.get('/bookmark/recommend', { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          setRecommendList(res.data.perfumes);
        }).catch((res) => {
          console.log(res)
        })
    }
  }

  // 향수 세포 키워드 가져오는 api
  const getKeywordList = () => {
    if (myToken && myToken.length > 0) {
      axios.get('/survey', { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          let fragranceWheelKeywordsArray: KeywordType[] = [];
          let moodKeywordsArray: KeywordType[] = [];
          res.data.map((el: KeywordType) => el.utagtype_id === 1 ? fragranceWheelKeywordsArray.push(el) : moodKeywordsArray.push(el))
          setFragranceWheelKeywords(fragranceWheelKeywordsArray);
          setMoodKeywords(moodKeywordsArray);
        }).catch((res) => {
          console.log(res)
        })
    }
  }


  useEffect(() => {
    getUserProfile();
    getUserKeyword();
    getBookmarkList();
    getRecommendList();
    getKeywordList();
  }, [myToken])

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
      <PerfumeCellModifyModal
        fragranceWheelKeywords={fragranceWheelKeywords}
        moodKeywords={moodKeywords}
        ModalBackground={modalBackground}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userKeyword={userKeyword}
        setUserKeyword={setUserKeyword}
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
        <PageName>마이페이지</PageName>
        <ProfileArea>
          <ProfileImage src={imageUrl} />
          <NameEmailArea>
            <div className="name_text">{name}</div>
            <div className="email_text">{email}</div>
            <ChangeInfoButton>프로필 수정하기</ChangeInfoButton>
          </NameEmailArea>
        </ProfileArea>

        <KeywordArea>
          <KeywordAreaTitle>나의 향수 세포</KeywordAreaTitle>
          <MyKeywordsArea>
            {userKeyword?.map((el) => <Keyword isModify={false} key={el.id}>{el.utag_kr}</Keyword>)}
            <Keyword onClick={() => setIsModalOpen(true)} isModify={true}>#수정하기</Keyword>
          </MyKeywordsArea>
        </KeywordArea>
        <TabButtonArea>
          <BookmarkedTabButton clickedTabMenu={clickedTabMenu} onClick={() => setClickedTabMenu("북마크한 향수")}>
            북마크한 향수
          </BookmarkedTabButton>
          <RecommendTabButton clickedTabMenu={clickedTabMenu} onClick={() => setClickedTabMenu("맞춤 추천 향수")}>
            맞춤 추천 향수
          </RecommendTabButton>
        </TabButtonArea>
        {clickedTabMenu === '북마크한 향수' ?
          bookmarkList?.length ? bookmarkList.map((el) => <PerfumeCell key={el.perfume_id} Perfume={el} />) :
            <div>북마크한 향수가 없습니다.</div>
          : recommendList?.length ? recommendList?.map((el) => <PerfumeCell key={el.perfume_id} Perfume={el} />)
            : <div>맞춤 추천을 받기 위해서 마음에 드는 향수를 북마크해주세요.</div>}

      </ContentArea>
    </Container>
  </>
  );
};

export default MyPage;
