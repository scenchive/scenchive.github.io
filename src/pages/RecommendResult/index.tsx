import React, { useEffect, useState } from "react";
import {
  Card,
  CardText,
  Cards,
  Container,
  Keyword,
  PageButton,
  PageNation,
  Top,
} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

interface Perfumes {
  id: number;
  perfumeName: string;
  perfumeImage: string;
  brandName: string;
  brandName_kr: string;
  ratingAvg: number;
}

const RecommendResult = () => {
  const [token, setToken] = useState<string | null>(null);
  const [querySearch, setQuerySearch] = useSearchParams();
  const navigate = useNavigate();
  const keywordIds = querySearch.get("id")?.split(",").map(Number);
  let keywordString = "";
  const [perfumes, setPerfumes] = useState<Array<Perfumes> | null>(null);
  const [num, setNum] = useState(0);
  const [perfumesPage, setPerfumesPage] = useState(0);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    keywordIds?.map((el) => (keywordString += `keywordId=${el}&`));
  }, [keywordIds]);

  useEffect(() => {
    if (token && num / 10 >= perfumesPage) {
      getPerfumes();
    }
  }, [token, perfumesPage]);

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
        setPerfumes(res.data.perfumes);
        setNum(res.data.totalPerfumeCount);
      });
  };

  const setPage = (num: number) => {
    setPerfumesPage(num);
  };

  return (
    <Container>
      <Top>
        {keywordIds?.map((el) => {
          return <Keyword># {el}</Keyword>;
        })}
      </Top>
      <Cards>
        {perfumes?.map((el, index) => {
          return (
            <Card>
              <img src={el.perfumeImage} />
              <CardText>
                <div className="card-text__title">{el.perfumeName}</div>
                <div className="card-text__brand">{el.brandName_kr}</div>
                <div className="card-text__brand">{el.brandName}</div>
              </CardText>
            </Card>
          );
        })}
      </Cards>
      <PageNation>
        <img
          src="/assets/icon/icon_arrow_left.svg"
          onClick={() => setPerfumesPage(perfumesPage - 1)}
        />
        {new Array(Math.ceil(num / 10)).fill(0).map((el, index) => {
          return (
            <PageButton
              onClick={() => setPage(index)}
              style={{
                border:
                  perfumesPage === index ? "2px solid #bf8dff" : undefined,
              }}
            >
              {index + 1}
            </PageButton>
          );
        })}
        <img
          src="/assets/icon/icon_arrow_right.svg"
          onClick={() => setPerfumesPage(perfumesPage + 1)}
        />
      </PageNation>
    </Container>
  );
};

export default RecommendResult;
