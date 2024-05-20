import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import useApi from "../../hooks/useApi";
import { BoardType } from "../../common/types";


const Community = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data: checkToken, loading: checkTokenLoading, error: checkTokenError, fetchApi: fetchCheckToken } = useApi<any>();
  const { data: communityList, loading: communityListLoading, error: communityListError, fetchApi: fetchCommunityList } = useApi<any>();
  const { data: communityTypeList, loading: communityTypeListLoading, error: communityTypeListError, fetchApi: fetchCommunityTypeList } = useApi<any>();

  const [myToken, setMyToken] = useState<string | null>();
  const [selectedMenu, setSelectedMenu] = useState<string>("전체");
  const [boardList, setBoardList] = useState<BoardType[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  let token = localStorage.getItem("my-token");

  const goToLogin = () => {
    navigate("/login");
  };

  const menuItems = [
    { label: "전체", value: "전체" },
    { label: "정/가품", value: "정/가품" },
    { label: "Q & A", value: "Q & A" },
    { label: "자유", value: "자유" },
  ]


  /* 
  * 토큰 유효성 검사 api를 호출합니다.
  * @author 김민지
  */
  const validateToken = useCallback(async () => {
    if (token && token.length > 0) {
      const res = await fetchCheckToken("post", "/token-validation", {});
      if (res?.length > 0) {
        setMyToken(token);
      } else if (checkTokenError) {
        goToLogin();
      }
    } else {
      goToLogin();
    }
  }, [token]);

  useEffect(() => {
    validateToken();
  }, [validateToken])


  /* 
  * 커뮤니티 목록 api를 호출합니다.
  *  @author 김민지
  */
  const getCommunity = useCallback(async () => {
    if (myToken && myToken.length > 0) {
      let data;
      if (selectedMenu === '전체') {
        data = await fetchCommunityList("get", `/boards?page=${page}`, {});
      } else {
        const typeMap: { [key: string]: number } = {
          "정/가품": 2,
          "Q & A": 1,
          "자유": 3,
        };
        data = await fetchCommunityTypeList("get", `/boardtype/${typeMap[selectedMenu]}?page=${page}`, {});

      }
      setCount(data?.totalBoardCount || 0);
      setBoardList(data?.boards || []);
    }
  }, [myToken, selectedMenu, page]);

  useEffect(() => {
    getCommunity();
  }, [getCommunity]);


  useEffect(() => {
    if (state) {
      const menuMap: { [key: string]: string } = {
        fake: "정/가품",
        qna: "Q & A",
        free: "자유",
      };
      setSelectedMenu(menuMap[state] || "전체");
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
            {menuItems.map((menu) => (
              <CommunityMenu
                key={menu.value}
                onClick={() => { setSelectedMenu(menu.value); setPage(0); }}
                style={{
                  color: selectedMenu === menu.value ? "#D67070" : "#B3B3B3",
                  fontSize: selectedMenu === menu.value ? "2rem" : "1.4rem",
                  fontWeight: selectedMenu === menu.value ? "600" : "normal",
                }}
              >
                {menu.label}
              </CommunityMenu>
            ))}
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
            {boardList.map((el, index) => (
              <CommunityRow key={index} onClick={() => navigate(`/communitydetail?detail=${el?.id}`)}>
                <RowNumber>{el?.id}</RowNumber>
                <RowMenu>
                  {el?.boardtype_name === "fake" ? "정/가품" : el?.boardtype_name === "qna" ? "Q & A" : "자유"}
                </RowMenu>
                <RowTitle>{el?.title}</RowTitle>
              </CommunityRow>
            ))}

          </CommunityArea>
          <Pagination
            count={Math.floor((count - 1) / 10) + 1}
            page={page}
            setPage={setPage}
          />
        </Main>
      </Container>
    </>
  );
};

export default Community;
