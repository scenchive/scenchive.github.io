import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderText,
  Top,
  Title,
  Search,
  Main,
  MainTop,
  Menu,
  MenuList,
  Select,
  Option,
  MainBottom,
  MainBottomContent,
  ContentText,
  SearchList,
  ListContent,
  ListDetail,
} from "./styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Perfumes {
  id: number;
  perfumeName: string;
  perfumeImage: string;
  brandName: string;
  brandName_kr: string;
  ratingAvg: number;
}

const Home = () => {
  const navigate = useNavigate();
  const [selectToggle, setSelectToggle] = useState(false);
  const [option, setOption] = useState(0);
  const options = ["봄", "여름", "가을", "겨울"];
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [perfumes, setPerfumes] = useState<Perfumes[]>([]);
  const [perfumeIndex, setPerfumeIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [searchBrands, setSearchBrands] = useState([]);
  const [searchPerfumes, setSearchPerfumes] = useState([]);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) getUsername();
  }, [token]);

  useEffect(() => {
    if (token) getPerfumeData();
  }, [option, token]);

  const getToken = () => {
    const token = localStorage.getItem("my-token");
    setToken(token);
  };

  const getUsername = async () => {
    await axios
      .get(`/username`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsername(res.data));
  };

  const getPerfumeData = async () => {
    await axios
      .get(`/recommend?season=${option + 36}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPerfumes(res.data));
  };

  const getSearchResult = async () => {
    await axios
      .get(`/search?name=search&page=1`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSearchBrands(res.data.brands);
        setSearchPerfumes(res.data.perfumes);
      });
  };

  const handleSelectClick = () => {
    setSelectToggle(!selectToggle);
  };

  const handleOptionClick = (val: number) => {
    setOption(val);
    handleSelectClick();
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleSwipeClick = (dir: number) => {
    if (perfumeIndex + dir === perfumes.length) setPerfumeIndex(0);
    else if (perfumeIndex + dir === -1) setPerfumeIndex(perfumes.length - 1);
    else setPerfumeIndex(perfumeIndex + dir);
  };

  return (
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
          {!token ? (
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
      <Top>
        <Search isSearching={search.length === 0 ? false : true}>
          <input
            type="text"
            className="search__input"
            placeholder="향수 이름 혹은 브랜드 명을 검색하세요"
            onChange={(e) => setSearch(e.target.value)}
          />
          <img src="/assets/icon/icon_search.svg" className="search__img" />
        </Search>
        {search.length !== 0 && (
          <SearchList>
            <ListContent>
              <div className="list-content__title">브랜드</div>
              <ListDetail>
                <img src="/assets/icon/icon_search.svg" />
                <div className="list-detail__name">딥디크</div>
                <img src="/assets/icon/icon_link.svg" />
              </ListDetail>
            </ListContent>
            <ListContent>
              <div className="list-content__title">향수</div>
              {["딥디크 오로즈", "딥디크 오로즈"].map((el) => {
                return (
                  <ListDetail>
                    <img src="/assets/icon/icon_search.svg" />
                    <div className="list-detail__name">{el}</div>
                    <img src="/assets/icon/icon_link.svg" />
                  </ListDetail>
                );
              })}
            </ListContent>
          </SearchList>
        )}
      </Top>
      {token ? (
        <Main>
          <MainTop>
            <div className="main-top__text">'{username}'님을 위한</div>
            <Select>
              <img
                src={
                  selectToggle
                    ? "/assets/icon/icon_arrow_up.svg"
                    : "/assets/icon/icon_arrow_down.svg"
                }
              />
              <Option onClick={handleSelectClick}>{options[option]}</Option>
              {selectToggle &&
                options.map((el, index) => {
                  if (index !== option) {
                    return (
                      <Option
                        style={{ color: "#8D8D8D" }}
                        onClick={() => handleOptionClick(index)}
                      >
                        {el}
                      </Option>
                    );
                  }
                })}
            </Select>
            <div className="main-top__text">향수 추천</div>
          </MainTop>
          <MainBottom>
            <img
              src="/assets/icon/icon_arrow_left.svg"
              onClick={() => handleSwipeClick(-1)}
            />
            <MainBottomContent>
              <img src={perfumes[perfumeIndex]?.perfumeImage} />
              <ContentText>
                <div className="content-text__name">
                  {perfumes[perfumeIndex]?.perfumeName}
                </div>
                <div className="content-text__brand-kr">
                  {perfumes[perfumeIndex]?.brandName_kr}
                </div>
                <div className="content-text__brand-en">
                  {perfumes[perfumeIndex]?.brandName}
                </div>
                <div className="content-text__rate">
                  <img src="/assets/icon/icon_star.svg" />
                  <div>{perfumes[perfumeIndex]?.ratingAvg} / 5</div>
                </div>
              </ContentText>
            </MainBottomContent>
            <img
              src="/assets/icon/icon_arrow_right.svg"
              onClick={() => handleSwipeClick(-1)}
            />
          </MainBottom>
        </Main>
      ) : null}
    </Container>
  );
};

export default Home;
