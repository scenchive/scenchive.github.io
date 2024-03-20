import React, { useEffect, useRef, useState } from "react";
import { Container, Main, Content, List, Lists, ListText } from "./styles";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {api} from "../../api";
import Header from "../../components/Header";
import Search from "../../components/Search";

interface Perfumes {
  perfumeId: number;
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
  const [resultBrands, setResultBrands] = useState<Array<Brands> | null>(null);
  const [resultPerfumes, setResultPerfumes] = useState<Array<Perfumes> | null>(
    null
  );
  const [perfumesPage, setPerfumesPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const view = useRef<HTMLDivElement>(null);

  //무한 스크롤 target이 감지되면 호출되는 함수
  const callback = () => {
    if (perfumesPage !== -1) setPerfumesPage(perfumesPage + 1);
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
  }, [token, querySearch.get("search")]);

  useEffect(() => {
    if (token !== null && perfumesPage !== -1) getSearchResult("more");
  }, [perfumesPage]);

  const getToken = () => {
    const token = localStorage.getItem("my-token");
    setToken(token);
  };

  const getSearchResult = async (type: string) => {
    await api
      .get(
        `/search?name=${querySearch.get("search")}&page=${
          type !== "more" ? 0 : perfumesPage
        }`,
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
        } else if (type === "more") {
          //무한스크롤
          if (res.data)
            setResultPerfumes((prev) =>
              prev !== null
                ? [...prev, ...res.data?.perfumes]
                : res.data.perfumes
            );
          else setPerfumesPage(-1);
          setLoading(false);
        }
      });
  };

  return (
    <Container>
      <Header />
      <Search />
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
                      <div className="list-text__title">{el.brandName_kr}</div>
                      <div className="list-text__sub-title">{el.brandName}</div>
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
                  <List
                    onClick={() =>
                      navigate(`/perfumedetail?perfume=${el.perfumeId}`)
                    }
                  >
                    <img src={`${el.perfumeImage}`} />
                    <ListText>
                      <div className="list-text__title">{el.perfumeName}</div>
                      <div className="list-text__sub-title">{el.brandName}</div>
                      <div className="list-text__sub-title">
                        {el.brandName_kr}
                      </div>
                    </ListText>
                  </List>
                );
              })}
              {resultPerfumes && (
                <div ref={setTarget} style={{ width: "100%", height: "1px" }} />
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
  );
};

export default SearchResult;
