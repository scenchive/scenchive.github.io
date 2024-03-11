import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Main,
  PageTitleArea,
  PageTitle,
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
  boardtype: string;
  title: string;
}

const MyBoards = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [myToken, setMyToken] = useState<string | null>();
  const [userContentList, setUserContentList] = useState<BoardType[]>();



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

  const getUserContent = () => {
    if (myToken && myToken.length > 0) {
      axios.get('/user/content', { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          console.log('res', res)
          setUserContentList(res?.data?.boards)
        }).catch((res) => {
          alert('로그인 후 이용 가능합니다.')
          goToHome();
        })
    }

  }

  useEffect(() => {
    getUserContent();
  }, [myToken])


  return (<>
    <Container>
      <Header />
      <Search />
      <Main>
        <PageTitleArea>
          <PageTitle >내가 작성한 게시물</PageTitle>
        </PageTitleArea>
        <CommunityArea>

          <CommunityRow style={{ marginTop: "12px" }}>
            <RowNumber style={{ fontSize: "1.4rem", fontWeight: "500" }}>번호</RowNumber>
            <RowMenu style={{ fontSize: "1.4rem", fontWeight: "500" }}>구분</RowMenu>
            <RowTitle style={{ fontSize: "1.4rem", fontWeight: "500" }}>내용</RowTitle>
          </CommunityRow>
          {
            userContentList?.map((el, index) =>
              <CommunityRow key={index} onClick={() => navigate('/communitydetail?detail=' + el?.id)}>
                <RowNumber>{index + 1}</RowNumber>
                <RowMenu>{el?.boardtype=== "fake" ? "정/가품" : el?.boardtype=== "qna" ? "Q & A" : "자유"}</RowMenu>
                <RowTitle>{el?.title}</RowTitle>
              </CommunityRow>)
          }

        </CommunityArea>
      </Main>
    </Container>
  </>
  );
};

export default MyBoards;
