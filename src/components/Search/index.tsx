import React, { useEffect, useState } from "react";
import {
  Container,
  Input,
  InputBox,
  ListContent,
  ListDetail,
  SearchList,
} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import {api} from "../../api";

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

const Search = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchBrands, setSearchBrands] = useState<Array<Brands> | null>(null);
  const [searchPerfumes, setSearchPerfumes] = useState<Array<Perfumes> | null>(
    null
  );
  const [toggle, setToggle] = useState(false);
  const [querySearch, setQuerySearch] = useSearchParams();

  useEffect(() => {
    getToken();
    if (querySearch.get("search"))
      setSearch(JSON.stringify(querySearch.get("search")).split('"')[1]);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search.length > 1) {
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

  const getSearchResult = async () => {
    await api
      .get(`/search?name=${search}&page=0`, {
      })
      .then((res) => {
        if (res.data.brandsNum === 0) setSearchBrands(null);
        else setSearchBrands(res.data.brands.slice(0, 5));
        if (res.data.perfumesNum === 0) setSearchPerfumes(null);
        else setSearchPerfumes(res.data.perfumes.slice(0, 5));
      });
  };

  const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/searchresult?search=${search}`);
      setToggle(false);
    }
  };

  return (
    <Container>
      <InputBox>
        <Input
          type="text"
          className="search__input"
          placeholder="향수 이름 혹은 브랜드 명을 검색하세요"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
            setToggle(true);
          }}
          onKeyDown={(e) => handleEnterClick(e)}
        />
        <img
          src="/assets/icon/icon_search_color.svg"
          className="search__img"
          onClick={() => {
            navigate(`/searchresult?search=${search}`);
            setToggle(false);
          }}
        />
      </InputBox>
      {toggle && (searchPerfumes !== null || searchBrands !== null) && (
        <SearchList>
          {searchBrands !== null && (
            <ListContent>
              <div className="list-content__title">브랜드</div>
              {searchBrands.map((el, index) => {
                return (
                  <ListDetail
                    key={'list_'+index}
                    onClick={() => {
                      navigate(`/searchresult?search=${el.brandName_kr}`);
                      setToggle(false);
                      setSearch(el.brandName_kr);
                    }}
                  >
                    <img src="/assets/icon/icon_search.svg" />
                    <div className="list-detail__name">{el.brandName_kr}</div>
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
                      setToggle(false);
                      setSearch(el.perfumeName);
                    }}
                  >
                    <img src="/assets/icon/icon_search.svg" />
                    <div className="list-detail__name">{el.perfumeName}</div>
                    <img src="/assets/icon/icon_link.svg" />
                  </ListDetail>
                );
              })}
            </ListContent>
          )}
        </SearchList>
      )}
    </Container>
  );
};

export default Search;
