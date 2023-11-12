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

interface Brands {
  brandName: string;
  brandName_kr: string;
  brandImage: string;
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
  const [searchBrands, setSearchBrands] = useState<Array<Brands> | null>(null);
  const [searchPerfumes, setSearchPerfumes] = useState<Array<Perfumes> | null>(
    null
  );

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) getUsername();
  }, [token]);

  useEffect(() => {
    if (token) getPerfumeData();
  }, [option, token]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search.length > 0) {
        getSearchResult();
      } else {
        setSearchBrands(null);
        setSearchPerfumes(null);
      }
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [search]);

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
      .get(`/search?name=${search}&page=0`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.brandsNum === 0) setSearchBrands(null);
        else setSearchBrands(res.data.brands);
        if (res.data.perfumesNum === 0) setSearchPerfumes(null);
        else setSearchPerfumes(res.data.perfumes);
      });
  };

  const handleSelectClick = () => {
    setSelectToggle(!selectToggle);
  };

  const handleOptionClick = (val: number) => {
    setOption(val);
    handleSelectClick();
  };

  const handleSwipeClick = (dir: number) => {
    if (perfumeIndex + dir === perfumes.length) setPerfumeIndex(0);
    else if (perfumeIndex + dir === -1) setPerfumeIndex(perfumes.length - 1);
    else setPerfumeIndex(perfumeIndex + dir);
  };

  const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") navigate(`/searchresult?search=${search}`);
  };

  return (
    <>
      <Header>
        <HeaderLeft>
          <Title onClick={()=>navigate('/')}>
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
      <Container>
        <Top>
          <Search
            isSearching={
              searchBrands === null && searchPerfumes === null ? false : true
            }
          >
            <input
              type="text"
              className="search__input"
              placeholder="향수 이름 혹은 브랜드 명을 검색하세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                handleEnterClick(e);
              }}
            />
            <img
              src="/assets/icon/icon_search.svg"
              className="search__img"
              onClick={() => navigate(`/searchresult?search=${search}`)}
            />
          </Search>
          {(searchPerfumes !== null || searchBrands !== null) && (
            <SearchList>
              {searchBrands !== null && (
                <ListContent>
                  <div className="list-content__title">브랜드</div>
                  {searchBrands.map((el) => {
                    return (
                      <ListDetail
                        onClick={() =>
                          navigate(`/searchresult?search=${el.brandName_kr}`)
                        }
                      >
                        <img src="/assets/icon/icon_search.svg" />
                        <div className="list-detail__name">
                          {el.brandName_kr}
                        </div>
                        <img src="/assets/icon/icon_link.svg" />
                      </ListDetail>
                    );
                  })}
                </ListContent>
              )}
              {searchPerfumes !== null && (
                <ListContent>
                  <div className="list-content__title">향수</div>
                  {searchPerfumes.map((el) => {
                    return (
                      <ListDetail
                        onClick={() =>
                          navigate(`/searchresult?search=${el.perfumeName}`)
                        }
                      >
                        <img src="/assets/icon/icon_search.svg" />
                        <div className="list-detail__name">
                          {el.perfumeName}
                        </div>
                        <img src="/assets/icon/icon_link.svg" />
                      </ListDetail>
                    );
                  })}
                </ListContent>
              )}
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
    </>
  );
};

export default Home;
