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
  ContentArea,
  CommentContent,
  CommentBoardTitle,

  
} from "./styles";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Search from "../../components/Search";

interface CommentType {
  commentId: number;
  commentContent: string;
  boardId: number;
  boardTitle: string;
  commentModifiedAt: string;
}

const MyComments = () => {
  const navigate = useNavigate();
  const {state}=useLocation();
  const [myToken, setMyToken] = useState<string | null>();
  const [userCommentList, setUserCommentList] = useState<CommentType[]>();


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

  const getUserComment = () => {
    if (myToken && myToken.length > 0) {
      axios.get('/user/content', { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          setUserCommentList(res?.data?.comments)
        }).catch((res) => {
          alert('로그인 후 이용 가능합니다.')
          goToHome();
        })
    }

  }


  useEffect(() => {
    getUserComment();
  }, [myToken])

  

  return (<>
    <Container>
      <Header />
      <Search />
      <Main>

      <PageTitleArea>
          <PageTitle >내가 작성한 댓글</PageTitle>
        </PageTitleArea>
        <CommunityArea>

          <CommunityRow style={{marginTop:"12px"}}>
            <RowNumber style={{fontSize:"1.4rem", fontWeight:"500"}}>번호</RowNumber>
            <RowMenu style={{fontSize:"1.4rem", fontWeight:"500"}}>내용</RowMenu>
          </CommunityRow>
          {
            userCommentList?.map((el, index) =>
              <CommunityRow key={index} onClick={() => navigate('/communitydetail?detail=' + el?.boardId)}>
                <RowNumber>{index + 1}</RowNumber>
                <ContentArea>
                  <CommentContent>
                    {el.commentContent}
                  </CommentContent>
                  <CommentBoardTitle>
                    {el.boardTitle}
                  </CommentBoardTitle>

                </ContentArea>
      
              </CommunityRow>)
          }
        </CommunityArea>
      </Main>
    </Container>
  </>
  );
};

export default MyComments;
