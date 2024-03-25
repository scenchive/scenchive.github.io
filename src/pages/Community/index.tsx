import React, { useEffect, useRef, useState } from "react";
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
import {api} from "../../api";
import Header from "../../components/Header";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

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
  const [boardList, setBoardList] = useState<BoardType[]>([]);
  const [fakeBoardList, setFakeBoardList] = useState<BoardType[]>();
  const [qnaBoardList, setQnaBoardList] = useState<BoardType[]>();
  const [freeBoardList, setFreeBoardList] = useState<BoardType[]>();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);

  const goToHome = () => {
    navigate("/");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    let token = localStorage.getItem("my-token");
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
        });
    } else {
      goToLogin();
    }
  }, []);

  const getCommunity = () => {
    if (myToken && myToken.length > 0) {
      if (selectedMenu === "전체") {
        api
          .get(`/boards?page=${page}`, {
            headers: { Authorization: `Bearer ${myToken}` },
          })
          .then((res) => {
            setCount(res?.data?.totalBoardCount);
            setBoardList(res?.data?.boards);
          })
          .catch((res) => {
            alert("로그인 후 이용 가능합니다.");
            goToHome();
          });
      } else if (selectedMenu === "정/가품") {
        api
          .get(`/boardtype/1?page=${page}`, {
            headers: { Authorization: `Bearer ${myToken}` },
          })
          .then((res) => {
            setCount(res?.data?.totalBoardCount);
            setQnaBoardList(res?.data?.boards);
          })
          .catch((res) => {
            alert("로그인 후 이용 가능합니다.");
            goToHome();
          });
      } else if (selectedMenu === "Q & A") {
        api
          .get(`/boardtype/2?page=${page}`, {
            headers: { Authorization: `Bearer ${myToken}` },
          })
          .then((res) => {
            setCount(res?.data?.totalBoardCount);
            setFakeBoardList(res?.data?.boards);
          })
          .catch((res) => {
            alert("로그인 후 이용 가능합니다.");
            goToHome();
          });
      } else {
        api
          .get(`/boardtype/3?page=${page}`, {
            headers: { Authorization: `Bearer ${myToken}` },
          })
          .then((res) => {
            setCount(res?.data?.totalBoardCount);
            setFreeBoardList(res?.data?.boards);
          })
          .catch((res) => {
            alert("로그인 후 이용 가능합니다.");
            goToHome();
          });
      }
    }
  };

  useEffect(() => {
    getCommunity();
    setPage(0);
  }, [myToken, selectedMenu]);

  useEffect(() => {
    if (state) {
      if (state === "fake") {
        setSelectedMenu("정/가품");
      } else if (state === "qna") {
        setSelectedMenu("Q & A");
      } else {
        setSelectedMenu("자유");
      }
    } else {
      setSelectedMenu("전체");
    }
  }, [state]);

  return (
    <>
      <Container>
        <Header />
        <Search />
        <Main>
          <MenuArea>
            <CommunityMenu
              onClick={() => setSelectedMenu("전체")}
              style={{
                color: selectedMenu === "전체" ? "#D67070 " : "#B3B3B3",
                fontSize: selectedMenu === "전체" ? "2rem" : "1.4rem",
                fontWeight: selectedMenu === "전체" ? "600" : "normal",
              }}
            >
              전체
            </CommunityMenu>
            <CommunityMenu
              onClick={() => setSelectedMenu("정/가품")}
              style={{
                color: selectedMenu === "정/가품" ? "#D67070 " : "#B3B3B3",
                fontSize: selectedMenu === "정/가품" ? "2rem" : "1.4rem",
                fontWeight: selectedMenu === "정/가품" ? "600" : "normal",
              }}
            >
              정/가품
            </CommunityMenu>
            <CommunityMenu
              onClick={() => setSelectedMenu("Q & A")}
              style={{
                color: selectedMenu === "Q & A" ? "#D67070 " : "#B3B3B3",
                fontSize: selectedMenu === "Q & A" ? "2rem" : "1.4rem",
                fontWeight: selectedMenu === "Q & A" ? "600" : "normal",
              }}
            >
              Q & A
            </CommunityMenu>
            <CommunityMenu
              onClick={() => setSelectedMenu("자유")}
              style={{
                color: selectedMenu === "자유" ? "#D67070 " : "#B3B3B3",
                fontSize: selectedMenu === "자유" ? "2rem" : "1.4rem",
                fontWeight: selectedMenu === "자유" ? "600" : "normal",
              }}
            >
              자유
            </CommunityMenu>
            <WriteButton onClick={() => navigate("/communitywrite")}>
              작성하기
            </WriteButton>
          </MenuArea>
          <CommunityArea>
            <CommunityRow style={{ marginTop: "12px" }}>
              <RowNumber style={{ fontSize: "1.4rem", fontWeight: "500" }}>
                번호
              </RowNumber>
              <RowMenu style={{ fontSize: "1.4rem", fontWeight: "500" }}>
                구분
              </RowMenu>
              <RowTitle style={{ fontSize: "1.4rem", fontWeight: "500" }}>
                제목
              </RowTitle>
            </CommunityRow>
            {selectedMenu === "전체"
              ? boardList?.map((el, index) => (
                  <CommunityRow
                    key={index}
                    onClick={() =>
                      navigate("/communitydetail?detail=" + el?.id)
                    }
                  >
                    <RowNumber>{el?.id}</RowNumber>
                    <RowMenu>
                      {el?.boardtype_name === "fake"
                        ? "정/가품"
                        : el?.boardtype_name === "qna"
                        ? "Q & A"
                        : "자유"}
                    </RowMenu>
                    <RowTitle>{el?.title}</RowTitle>
                  </CommunityRow>
                ))
              : selectedMenu === "정/가품"
              ? fakeBoardList?.map((el, index) =>
                  el?.boardtype_name === "fake" ? (
                    <CommunityRow
                      key={index}
                      onClick={() =>
                        navigate("/communitydetail?detail=" + el?.id)
                      }
                    >
                      <RowNumber>{el?.id}</RowNumber>
                      <RowMenu>정/가품</RowMenu>
                      <RowTitle>{el?.title}</RowTitle>
                    </CommunityRow>
                  ) : null
                )
              : selectedMenu === "Q & A"
              ? qnaBoardList?.map((el, index) =>
                  el?.boardtype_name === "qna" ? (
                    <CommunityRow
                      key={index}
                      onClick={() =>
                        navigate("/communitydetail?detail=" + el?.id)
                      }
                    >
                      <RowNumber>{el?.id}</RowNumber>
                      <RowMenu>Q & A</RowMenu>
                      <RowTitle>{el?.title}</RowTitle>
                    </CommunityRow>
                  ) : null
                )
              : freeBoardList?.map((el, index) =>
                  el?.boardtype_name === "free" ? (
                    <CommunityRow
                      key={index}
                      onClick={() =>
                        navigate("/communitydetail?detail=" + el?.id)
                      }
                    >
                      <RowNumber>{el?.id}</RowNumber>
                      <RowMenu>자유</RowMenu>
                      <RowTitle>{el?.title}</RowTitle>
                    </CommunityRow>
                  ) : null
                )}
          </CommunityArea>
          <Pagination
            count={Math.floor(count / 10) + 1}
            page={page}
            setPage={setPage}
          />
        </Main>
      </Container>
    </>
  );
};

export default Community;
