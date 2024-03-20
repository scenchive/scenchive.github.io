import React, { useEffect, useState, useRef } from "react";
import { Container, Top, TopText, Text, Lists, List, ListText } from "./styles";
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

const BrandDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [querySearch, setQuerySearch] = useSearchParams();
  const [perfumes, setPerfumes] = useState<Array<Perfumes> | null>(null);
  const [num, setNum] = useState(0);
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
    if (token && perfumesPage !== -1) {
      getPerfumes();
    }
  }, [token, perfumesPage]);

  const getToken = () => {
    const token = localStorage.getItem("my-token");
    setToken(token);
  };

  const getPerfumes = async () => {
    await api
      .get(
        `/brandperfume?name=${querySearch.get("name")}&page=${perfumesPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data) {
          setPerfumes((prev) =>
            prev !== null ? [...prev, ...res.data?.perfumes] : res.data.perfumes
          );
          setNum(res.data.totalBrandPerfumeCount);
        } else setPerfumesPage(-1);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Header />
      <Search />
      <Top>
        <img src={location.state.brandImage} />
        <TopText>
          <div className="top-text__title">{querySearch.get("name")}</div>
          <div className="top-text__sub-title">
            {location.state.brandName_kr}
          </div>
        </TopText>
      </Top>
      <Text>총 {num}개</Text>
      <Lists ref={view}>
        {perfumes?.map((el) => {
          return (
            <List
              onClick={() => navigate(`/perfumedetail?perfume=${el.perfumeId}`)}
            >
              <img src={`${el.perfumeImage}`} />
              <ListText>
                <div className="list-text__title">{el.perfumeName}</div>
                <div className="list-text__sub-title">{el.brandName}</div>
                <div className="list-text__sub-title">{el.brandName_kr}</div>
              </ListText>
            </List>
          );
        })}
        {perfumes && (
          <div ref={setTarget} style={{ width: "100%", height: "1px" }} />
        )}
      </Lists>
    </Container>
  );
};

export default BrandDetail;
