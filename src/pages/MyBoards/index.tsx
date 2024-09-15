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
  RowTitle,
  WriteButton,
} from "./styles";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../api";
import Header from "../../components/Header";
import Search from "../../components/Search";
import useApi from "../../hooks/useApi";
import { MyBoardsBoardType } from "../../common/types";

const MyBoards = () => {
  const navigate = useNavigate();
  const {
    data: checkToken,
    loading: checkTokenLoading,
    error: checkTokenError,
    fetchApi: fetchCheckToken,
  } = useApi<string>();
  const {
    data: userContentList,
    loading: userContentListLoading,
    error: userContentListError,
    fetchApi: fetchUserContentList,
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
         * 작성한 게시물 get api를 호출합니다.
         * @author 김민지
         */
        fetchUserContentList("get", "/user/content");
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
            <PageTitle>내가 작성한 게시물</PageTitle>
          </PageTitleArea>
          <CommunityArea>
            <CommunityRow style={{ marginTop: "12px" }}>
              <RowNumber style={{ fontSize: "1.4rem", fontWeight: "500" }}>
                번호
              </RowNumber>
              <RowMenu style={{ fontSize: "1.4rem", fontWeight: "500" }}>
                구분
              </RowMenu>
              <RowTitle style={{ fontSize: "1.4rem", fontWeight: "500" }}>
                내용
              </RowTitle>
            </CommunityRow>
            {userContentList !== undefined &&
              userContentList?.boards?.map(
                (el: MyBoardsBoardType, index: number) => (
                  <CommunityRow
                    key={index}
                    onClick={() =>
                      navigate("/communitydetail?detail=" + el?.id)
                    }
                  >
                    <RowNumber>{index + 1}</RowNumber>
                    <RowMenu>
                      {el?.boardtype === "fake"
                        ? "정/가품"
                        : el?.boardtype === "qna"
                        ? "Q & A"
                        : "자유"}
                    </RowMenu>
                    <RowTitle>{el?.title}</RowTitle>
                  </CommunityRow>
                )
              )}
          </CommunityArea>
        </Main>
      </Container>
    </>
  );
};

export default MyBoards;
