import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  Main,
  MenuArea,
  CommunityMenu,
  CommunityArea,
  CommunityRow,
  RowNumber,
  RowMenu,
  RowTitle,
  WriteButton,
} from "./styles";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Search from "../../components/Search";

interface BoardType {
  id: number;
  boardtype_name: string;
  title: string;
}

const Community = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [myToken, setMyToken] = useState<string | null>();
  const [querySearch, setQuerySearch] = useSearchParams();
  const [selectedMenu, setSelectedMenu] = useState<string>("전체");
  const [boardCount, setBoardCount] = useState<number>();
  const [boardList, setBoardList] = useState<BoardType[]>();
  const [fakeBoardCount, setFakeBoardCount] = useState<number>();
  const [fakeBoardList, setFakeBoardList] = useState<BoardType[]>();
  const [qnaBoardCount, setQnaBoardCount] = useState<number>();
  const [qnaBoardList, setQnaBoardList] = useState<BoardType[]>();
  const [freeBoardCount, setFreeBoardCount] = useState<number>();
  const [freeBoardList, setFreeBoardList] = useState<BoardType[]>();


  const [boardPage, setBoardPage] = useState<number>(0);

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

  const getCommunity = () => {
    if (myToken && myToken.length > 0) {
      axios.get('/boards?page=' + boardPage, { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          if (!boardCount) {
            setBoardCount(res?.data?.totalBoardCount);
          }
          if (res?.data?.boards) {
            setBoardList((prev) => {
              if (prev) { return [...prev, ...res?.data?.boards] }
              else { return res?.data?.boards }
            })
          }
        }).catch((res) => {
          alert('로그인 후 이용 가능합니다.')
          goToHome();
        })
    }
  }

  useEffect(() => {
    getCommunity();
  }, [myToken])

  useEffect(() => {
    if (state) {
      if (state === "fake") {
        setSelectedMenu("정/가품")
      } else if (state === "qna") {
        setSelectedMenu("Q & A")
      } else {
        setSelectedMenu("자유")
      }
    } else {
      setSelectedMenu("전체")
    }
  }, [state])




  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    if (Math.round(scrollTop + innerHeight + 125) >= scrollHeight) {
      if (boardList && boardCount && boardList?.length !== boardCount) {
        setBoardPage(boardPage + 1);
      }
      else if (boardList && boardCount && Math.ceil(boardCount) < (boardPage + 1) * 10) {
        window.removeEventListener('scroll', handleScroll, true);
      }
      if (boardPage > 0) {
        getCommunity();
      }
    }
  }, [boardPage, boardList]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);




  return (<>
    <Container>
      <Header />
      <Search />
      <Main>
        <MenuArea>
          <CommunityMenu onClick={() => setSelectedMenu("전체")} style={{ color: selectedMenu === "전체" ? "#D67070 " : "#B3B3B3", fontSize: selectedMenu === "전체" ? "2rem" : "1.4rem", fontWeight: selectedMenu === "전체" ? "600" : "normal" }}>전체</CommunityMenu>
          <CommunityMenu onClick={() => setSelectedMenu("정/가품")} style={{ color: selectedMenu === "정/가품" ? "#D67070 " : "#B3B3B3", fontSize: selectedMenu === "정/가품" ? "2rem" : "1.4rem", fontWeight: selectedMenu === "정/가품" ? "600" : "normal" }}>정/가품</CommunityMenu>
          <CommunityMenu onClick={() => setSelectedMenu("Q & A")} style={{ color: selectedMenu === "Q & A" ? "#D67070 " : "#B3B3B3", fontSize: selectedMenu === "Q & A" ? "2rem" : "1.4rem", fontWeight: selectedMenu === "Q & A" ? "600" : "normal" }}>Q & A</CommunityMenu>
          <CommunityMenu onClick={() => setSelectedMenu("자유")} style={{ color: selectedMenu === "자유" ? "#D67070 " : "#B3B3B3", fontSize: selectedMenu === "자유" ? "2rem" : "1.4rem", fontWeight: selectedMenu === "자유" ? "600" : "normal" }}>자유</CommunityMenu>
          <WriteButton onClick={() => navigate('/communitywrite')}>작성하기</WriteButton>

        </MenuArea>
        <CommunityArea>

          <CommunityRow style={{ marginTop: "12px" }}>
            <RowNumber style={{ fontSize: "1.4rem", fontWeight: "500" }}>번호</RowNumber>
            <RowMenu style={{ fontSize: "1.4rem", fontWeight: "500" }}>구분</RowMenu>
            <RowTitle style={{ fontSize: "1.4rem", fontWeight: "500" }}>제목</RowTitle>
          </CommunityRow>


          {
            selectedMenu === "전체" ?
              boardList?.map((el, index) =>
                <CommunityRow key={index} onClick={() => navigate('/communitydetail?detail=' + el?.id)}>
                  <RowNumber>{el?.id}</RowNumber>
                  <RowMenu>{el?.boardtype_name === "fake" ? "정/가품" : el?.boardtype_name === "qna" ? "Q & A" : "자유"}</RowMenu>
                  <RowTitle>{el?.title}</RowTitle>
                </CommunityRow>)
              : selectedMenu === "정/가품" ?
                boardList?.map((el, index) => el?.boardtype_name === "fake" ?
                  <CommunityRow key={index} onClick={() => navigate('/communitydetail?detail=' + el?.id)}>
                    <RowNumber>{el?.id}</RowNumber>
                    <RowMenu>정/가품</RowMenu>
                    <RowTitle>{el?.title}</RowTitle>
                  </CommunityRow> : null)
                : selectedMenu === "Q & A" ?
                  boardList?.map((el, index) => el?.boardtype_name === "qna" ?
                    <CommunityRow key={index} onClick={() => navigate('/communitydetail?detail=' + el?.id)}>
                      <RowNumber>{el?.id}</RowNumber>
                      <RowMenu>Q & A</RowMenu>
                      <RowTitle>{el?.title}</RowTitle>
                    </CommunityRow> : null)
                  : boardList?.map((el, index) => el?.boardtype_name === "free" ?
                    <CommunityRow key={index} onClick={() => navigate('/communitydetail?detail=' + el?.id)}>
                      <RowNumber>{el?.id}</RowNumber>
                      <RowMenu>자유</RowMenu>
                      <RowTitle>{el?.title}</RowTitle>
                    </CommunityRow> : null)
          }

        </CommunityArea>
      </Main>
    </Container>
  </>
  );
};

export default Community;
