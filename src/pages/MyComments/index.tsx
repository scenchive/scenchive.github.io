import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Search from "../../components/Search";
import useApi from "../../hooks/useApi";
import { CommentType } from "../../common/types";

const MyComments = () => {
  const navigate = useNavigate();
  const {
    data: checkToken,
    loading: checkTokenLoading,
    error: checkTokenError,
    fetchApi: fetchCheckToken,
  } = useApi<any>();
  const {
    data: userCommentList,
    loading: userCommentListLoading,
    error: userCommentListError,
    fetchApi: fetchUserCommentList,
  } = useApi<any>();
  const [myToken, setMyToken] = useState<string | null>();
  let token = localStorage.getItem("my-token");

  const goToLogin = () => {
    alert("로그인이 필요합니다.");
    navigate("/login");
  };

  /*
   * 토큰 유효성 검사 api를 호출합니다.
   * @author 김민지
   */
  const validateToken = useCallback(async () => {
    if (token && token.length > 0) {
      const res = await fetchCheckToken("post", "/token-validation", {});
      if (res?.length > 0) {
        setMyToken(token);
        /*
         * 유저 댓글 목록 get api를 호출합니다.
         * @author 김민지
         */
        fetchUserCommentList("get", "/user/content", {});
      } else if (checkTokenError) {
        goToLogin();
      }
    } else {
      alert("로그인 후 이용 가능합니다.");
      goToLogin();
    }
  }, [token]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return (
    <>
      <Container>
        <Header />
        <Search />
        <Main>
          <PageTitleArea>
            <PageTitle>내가 작성한 댓글</PageTitle>
          </PageTitleArea>
          <CommunityArea>
            <CommunityRow style={{ marginTop: "12px" }}>
              <RowNumber style={{ fontSize: "1.4rem", fontWeight: "500" }}>
                번호
              </RowNumber>
              <RowMenu style={{ fontSize: "1.4rem", fontWeight: "500" }}>
                내용
              </RowMenu>
            </CommunityRow>

            {userCommentList !== undefined &&
              userCommentList.comments?.map(
                (el: CommentType, index: number) => (
                  <CommunityRow
                    key={index}
                    onClick={() =>
                      navigate("/communitydetail?detail=" + el?.boardId)
                    }
                  >
                    <RowNumber>{index + 1}</RowNumber>
                    <ContentArea>
                      <CommentContent>{el.commentContent}</CommentContent>
                      <CommentBoardTitle>{el.boardTitle}</CommentBoardTitle>
                    </ContentArea>
                  </CommunityRow>
                )
              )}
          </CommunityArea>
        </Main>
      </Container>
    </>
  );
};

export default MyComments;
