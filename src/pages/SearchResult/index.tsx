import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderText,
  Top,
  Title,
  Search,
  Menu,
  MenuList,
  SearchList,
  ListContent,
  ListDetail,
  Main,
  Content,
  List,
  Lists,
  ListText,
} from "./styles";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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

const SearchResult = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [querySearch, setQuerySearch] = useSearchParams();
  const [search, setSearch] = useState("");
  const [searchBrands, setSearchBrands] = useState<Array<Brands> | null>(null);
  const [searchPerfumes, setSearchPerfumes] = useState<Array<Perfumes> | null>(
    null
  );
  const [resultBrands, setResultBrands] = useState<Array<Brands> | null>(null);
  const [resultPerfumes, setResultPerfumes] = useState<Array<Perfumes> | null>(
    null
  );
  const [perfumesPage, setPerfumesPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const view = useRef<HTMLDivElement>(null);

  const callback = () => {
    setPerfumesPage(perfumesPage + 1);
  };
  const options = {
    root: view.current,
    threshold: 1.0,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      callback();
      observer.unobserve(entries[0].target);
    }
  }, options);

  useEffect(() => {
    if (target) {
      setLoading(true);
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, loading]);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token !== null) getSearchResult("result");
  }, [token]);

  useEffect(() => {
    if (token !== null) getSearchResult("more");
  }, [perfumesPage]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search.length > 0) {
        getSearchResult("search");
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

  const getSearchResult = async (type: string) => {
    await axios
      .get(
        `/search?name=${
          type === "search" ? search : querySearch.get("search")
        }&page=${type !== "more" ? 0 : perfumesPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (type === "result") {
          //검색 결과
          if (res.data.brandsNum === 0) setResultBrands(null);
          else setResultBrands(res.data.brands);
          if (res.data.perfumesNum === 0) setResultPerfumes(null);
          else setResultPerfumes(res.data.perfumes);
        } else if (type === "search") {
          //자동검색어
          if (res.data.brandsNum === 0) setSearchBrands(null);
          else setSearchBrands(res.data.brands);
          if (res.data.perfumesNum === 0) setSearchPerfumes(null);
          else setSearchPerfumes(res.data.perfumes);
        } else if (type === "more") {
          //무한스크롤
          if (res.data.perfumesNum === 0) setResultPerfumes(null);
          else
            setResultPerfumes((prev) =>
              prev !== null
                ? [...prev, ...res.data.perfumes]
                : res.data.perfumes
            );
          setLoading(false);
        }
      });
  };

  const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/searchresult?search=${search}`);
      window.location.reload();
    }
  };

  return (
    <>
      <Header>
        <HeaderLeft>
          <Title onClick={() => navigate("/")}>
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
              onClick={() => {
                navigate(`/searchresult?search=${search}`);
                window.location.reload();
              }}
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
                        onClick={() => {
                          navigate(`/searchresult?search=${el.brandName_kr}`);
                          window.location.reload();
                        }}
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
                        onClick={() => {
                          navigate(`/searchresult?search=${el.perfumeName}`);
                          window.location.reload();
                        }}
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
        <Main>
          {resultBrands !== null && (
            <Content>
              <div className="content__title">브랜드</div>
              <Lists>
                {resultBrands.map((el) => {
                  return (
                    <List
                      onClick={() =>
                        navigate(`/branddetail?name=${el.brandName}`, {
                          state: {
                            brandName_kr: el.brandName_kr,
                            brandImage: el.brandImage,
                          },
                        })
                      }
                    >
                      <img src={el.brandImage} />
                      <ListText>
                        <div className="list-text__title">
                          {el.brandName_kr}
                        </div>
                        <div className="list-text__sub-title">
                          {el.brandName}
                        </div>
                      </ListText>
                    </List>
                  );
                })}
              </Lists>
            </Content>
          )}
          {resultPerfumes !== null && (
            <Content>
              <div className="content__title">향수</div>
              <Lists ref={view}>
                {resultPerfumes?.map((el) => {
                  return (
                    <List>
                      <img src={`${el.perfumeImage}`} />
                      <ListText>
                        <div className="list-text__title">{el.perfumeName}</div>
                        <div className="list-text__sub-title">
                          {el.brandName}
                        </div>
                        <div className="list-text__sub-title">
                          {el.brandName_kr}
                        </div>
                      </ListText>
                    </List>
                  );
                })}
                {resultPerfumes && (
                  <div
                    ref={setTarget}
                    style={{ width: "100%", height: "1px" }}
                  />
                )}
              </Lists>
            </Content>
          )}
          {resultBrands === null && resultPerfumes === null && (
            <Content>
              <div className="content__none">검색결과가 없습니다.</div>
            </Content>
          )}
        </Main>
      </Container>
    </>
  );
};

export default SearchResult;
