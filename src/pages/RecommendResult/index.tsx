import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardText,
  Cards,
  Container,
  Keyword,
  KeywordBox,
  Top,
} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Search from "../../components/Search";

interface Perfumes {
  id: number;
  perfumeName: string;
  perfumeImage: string;
  brandName: string;
  brandName_kr: string;
  ratingAvg: number;
}

interface Keyword {
  id: number;
  ptag_name: string;
  ptag_kr: string;
  ptagtype_id: number;
}

const RecommendResult = () => {
  const [token, setToken] = useState<string | null>(null);
  const [querySearch, setQuerySearch] = useSearchParams();
  const option = querySearch.get("option");
  const navigate = useNavigate();
  const keywordIds = querySearch.get("id")?.split(",").map(Number);
  let keywordString = "";
  const [perfumes, setPerfumes] = useState<Array<Perfumes> | []>([]);
  const [keywords, setKeywords] = useState<Array<Keyword> | []>([]);
  const [perfumesPage, setPerfumesPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const view = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token !== null) getKeyword();
  }, [token]);

  useEffect(() => {
    keywordIds?.map((el) => (keywordString += `keywordId=${el}&`));
  }, [keywordIds]);

  useEffect(() => {
    if (target) {
      setLoading(true);
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, loading]);

  useEffect(() => {
    if (token !== null && perfumesPage !== -1) getPerfumes();
  }, [token, perfumesPage]);

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

  const getToken = () => {
    const token = localStorage.getItem("my-token");
    setToken(token);
  };

  const getPerfumes = async () => {
    await axios
      .get(`/perfumes/recommend?${keywordString}page=${perfumesPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.perfumes) {
          setPerfumes((prev) => [...prev, ...res.data.perfumes]);
        } else {
          setPerfumesPage(-1);
        }
        setLoading(false);
      });
  };

  const getKeyword = async () => {
    await axios
      .get(`/perfumes/recommend/${option}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setKeywords(res.data);
      });
  };

  return (
    <Container>
      <Header />
      <Search />
      <Top>결과</Top>
      <KeywordBox>
        {keywordIds?.map((el, index) => {
          return (
            <Keyword key={index}># {keywords[el < 36 ? el - 1 : el - 11]?.ptag_kr}</Keyword>
          );
        })}
      </KeywordBox>
      <Cards>
        {perfumes?.map((el) => {
          return (
            <Card key={el.id} onClick={()=>navigate('/perfumedetail?perfume='+el.id)}>
              <img src={el.perfumeImage} />
              <CardText>
                <div className="card-text__title">{el.perfumeName}</div>
                <div className="card-text__brand">{el.brandName_kr}</div>
                <div className="card-text__brand">{el.brandName}</div>
              </CardText>
            </Card>
          );
        })}
        <div ref={setTarget} style={{ width: "100%", height: "280px" }} />
      </Cards>
    </Container>
  );
};

export default RecommendResult;
