import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Container,
  Main,
  KeywordArea,
  KeywordAreaTitle,
  MyKeywordsArea,
  Keyword,
  TabButtonArea,
  BookmarkedTabButton,
  RecommendTabButton,
  ListArea,
  NoticeComment,
} from './styles';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import PerfumeCell from './PerfumeCell';
import PerfumeCellModifyModal from './PerfumeCellModifyModal';
import Profile from './Profile';
import Header from '../../common/Header';
import Search from '../../common/Search';
import UserModifyModal from './UserModifyModal';
import { KeywordType, PerfumeType } from '../../common/types';
import useApi from '../../hooks/useApi';
import { resetUserType } from '../../stores/useUserAuthority';
import ProfileImageModifyModal from './ProfileImageChangeModal';

const MyPage = () => {
  const navigate = useNavigate();

  const {
    data: checkToken,
    loading: checkTokenLoading,
    error: checkTokenError,
    fetchApi: fetchCheckToken,
  } = useApi<any>();
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
    fetchApi: fetchProfile,
  } = useApi<any>();
  const {
    data: initialUserKeyword,
    loading: initialUserKeywordLoading,
    error: initialUserKeywordError,
    fetchApi: fetchInitialUserKeyword,
  } = useApi<KeywordType[]>();
  const {
    data: initialRecommendList,
    loading: initialRecommendListLoading,
    error: initialRecommendListError,
    fetchApi: fetchInitialRecommendList,
  } = useApi<PerfumeType[]>();
  const {
    data: keywordList,
    loading: keywordListLoading,
    error: keywordListError,
    fetchApi: fetchKeywordList,
  } = useApi<any>();
  const {
    data: bookmark,
    loading: bookmarkLoading,
    error: bookmarkError,
    fetchApi: fetchBookmark,
  } = useApi<any>();

  const [myToken, setMyToken] = useState<string | null>();
  const [email, setEmail] = useState<string | null>();
  const [name, setName] = useState<string | null>();
  const [imageUrl, setImageUrl] = useState<string>(
    '/assets/icon/icon-profile-picture.svg'
  );
  const [userKeyword, setUserKeyword] = useState<KeywordType[]>();
  const [fragranceWheelKeywords, setFragranceWheelKeywords] = useState<
    KeywordType[]
  >([]);
  const [moodKeywords, setMoodKeywords] = useState<KeywordType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false);
  const [isModalOpen3, setIsModalOpen3] = useState<boolean>(false);
  const [clickedTabMenu, setClickedTabMenu] = useState<string>('북마크한 향수');
  const [bookmarkList, setBookmarkList] = useState<PerfumeType[]>();
  const [totalBookmarkPerfumeCount, setTotalBookmarkPerfumeCount] =
    useState<number>();
  const [recommendList, setRecommendList] = useState<PerfumeType[]>();
  const modalBackground = useRef<HTMLDivElement>(null);
  const [bookmarkPage, setBookmarkPage] = useState<number>(0);
  const token = localStorage.getItem('my-token');

  const goToLogin = () => {
    alert('로그인이 필요합니다.');
    navigate('/login');
  };

  /*
   * 토큰 유효성 검사 api를 호출합니다.
   * @author 김민지
   */
  const validateToken = useCallback(async () => {
    if (token && token.length > 0) {
      const res = await fetchCheckToken('post', '/token-validation', {});
      if (res?.length > 0) {
        setMyToken(token);
        fetchProfile('get', '/profile');
        fetchInitialUserKeyword('get', '/keyword');
        fetchInitialRecommendList('get', '/bookmark/recommend');
        fetchKeywordList('get', '/survey');
        getBookmarkList();
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

  useEffect(() => {
    if (isModalOpen2 === false) {
      fetchProfile('get', '/profile');
    }
  }, [isModalOpen2]);

  // useEffect(()=>{
  //   if (isModalOpen2===false){

  //   }
  // })

  // 북마크 목록 가져오는 api
  const getBookmarkList = async () => {
    try {
      const res = await fetchBookmark('get', '/bookmark?page=' + bookmarkPage);
      if (res?.perfumes.length > 0) {
        if (!totalBookmarkPerfumeCount) {
          setTotalBookmarkPerfumeCount(res?.totalBookmarkPerfumeCount);
        }
        const newBookmarkList = bookmarkList?.concat(...res?.perfumes);
        setBookmarkList((prev) => {
          if (prev) {
            return [...prev, ...res?.perfumes];
          } else {
            return res?.perfumes;
          }
        });
        if (
          newBookmarkList &&
          newBookmarkList.length === totalBookmarkPerfumeCount
        ) {
          window.removeEventListener('scroll', handleScroll, true);
        }
      }
    } catch {}
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        modalBackground.current &&
        !modalBackground.current.contains(e.target as Node)
      ) {
        if (isModalOpen === true) {
          setIsModalOpen(false);
        } else if (isModalOpen2 === true) {
          setIsModalOpen2(false);
        } else if (isModalOpen3 === true) {
          setIsModalOpen(false);
        }
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [modalBackground]);

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (Math.round(scrollTop + innerHeight + 25) >= scrollHeight) {
      if (
        bookmarkList &&
        totalBookmarkPerfumeCount &&
        bookmarkList?.length !== totalBookmarkPerfumeCount
      ) {
        setBookmarkPage(bookmarkPage + 1);
      } else if (
        bookmarkList &&
        totalBookmarkPerfumeCount &&
        Math.ceil(totalBookmarkPerfumeCount) < (bookmarkPage + 1) * 10
      ) {
        window.removeEventListener('scroll', handleScroll, true);
      }
      if (bookmarkPage > 0) {
        getBookmarkList();
      }
    }
  }, [bookmarkPage, bookmarkList]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (profile !== undefined) {
      setEmail(profile.email);
      setImageUrl(profile.imageUrl);
      setName(profile.name);
    }
  }, [profile]);

  useEffect(() => {
    if (initialUserKeyword !== undefined) {
      setUserKeyword(initialUserKeyword);
    }
  }, [initialUserKeyword]);

  useEffect(() => {
    if (initialRecommendList !== undefined) {
      setRecommendList(initialRecommendList);
    }
  }, [initialRecommendList]);

  useEffect(() => {
    if (keywordList !== undefined) {
      const fragranceWheelKeywordsArray: KeywordType[] = [];
      const moodKeywordsArray: KeywordType[] = [];
      keywordList.map((el: KeywordType) =>
        el.utagtype_id === 1
          ? fragranceWheelKeywordsArray.push(el)
          : moodKeywordsArray.push(el)
      );
      setFragranceWheelKeywords(fragranceWheelKeywordsArray);
      setMoodKeywords(moodKeywordsArray);
    }
  }, [keywordList]);

  return (
    <>
      {isModalOpen === true ? (
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
      ) : null}

      {isModalOpen2 === true ? (
        <UserModifyModal
          oldName={name}
          setName={setName}
          ModalBackground={modalBackground}
          isModalOpen2={isModalOpen2}
          setIsModalOpen2={setIsModalOpen2}
          myToken={myToken}
        />
      ) : null}

      {isModalOpen3 === true ? (
        <ProfileImageModifyModal
          ModalBackground={modalBackground}
          imageUrl={imageUrl}
          isModalOpen3={isModalOpen3}
          setIsModalOpen3={setIsModalOpen3}
          myToken={myToken}
        />
      ) : null}

      <Container>
        <Header />
        <Search />

        <Main>
          <Profile
            imageUrl={imageUrl}
            name={name}
            email={email}
            setIsModalOpen2={setIsModalOpen2}
            setIsModalOpen3={setIsModalOpen3}
          />

          <KeywordArea>
            <KeywordAreaTitle>나의 향수 세포</KeywordAreaTitle>
            <MyKeywordsArea>
              {userKeyword?.map((el) => (
                <Keyword isModify={false} key={el.id}>
                  {el.utag_kr}
                </Keyword>
              ))}
              <Keyword onClick={() => setIsModalOpen(true)} isModify={true}>
                #수정하기
              </Keyword>
            </MyKeywordsArea>
          </KeywordArea>
          <TabButtonArea>
            <BookmarkedTabButton
              clickedTabMenu={clickedTabMenu}
              onClick={() => setClickedTabMenu('북마크한 향수')}
            >
              북마크한 향수
            </BookmarkedTabButton>
            <RecommendTabButton
              clickedTabMenu={clickedTabMenu}
              onClick={() => setClickedTabMenu('맞춤 추천 향수')}
            >
              맞춤 추천 향수
            </RecommendTabButton>
          </TabButtonArea>
          <ListArea>
            {clickedTabMenu === '북마크한 향수' ? (
              bookmarkList?.length ? (
                bookmarkList.map((el) => (
                  <PerfumeCell key={'bookmark_' + el.perfume_id} Perfume={el} />
                ))
              ) : (
                <NoticeComment>북마크한 향수가 없습니다.</NoticeComment>
              )
            ) : recommendList?.length ? (
              recommendList?.map((el) => (
                <PerfumeCell
                  key={'recommended_' + el.perfume_id}
                  Perfume={el}
                />
              ))
            ) : (
              <NoticeComment>
                맞춤 추천을 받기 위해서 마음에 드는 향수를 북마크해주세요.
              </NoticeComment>
            )}
          </ListArea>
        </Main>
      </Container>
    </>
  );
};

export default MyPage;
