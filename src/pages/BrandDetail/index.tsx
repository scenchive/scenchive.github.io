import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderText,
  Top,
  TopText,
  Title,
  Menu,
  MenuList,
  Text,
  Card,
  Cards,
  CardText,
  PageNation,
  PageButton,
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

const BrandDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [querySearch, setQuerySearch] = useSearchParams();
  const [perfumes, setPerfumes] = useState<Array<Perfumes> | null>(null);
  const [num, setNum] = useState(0);
  const [perfumesPage, setPerfumesPage] = useState(0);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      getPerfumes();
    }
  }, [token, perfumesPage]);

  const getToken = () => {
    const token = localStorage.getItem("my-token");
    setToken(token);
  };

  const getPerfumes = async () => {
    await axios
      .get(
        `/brandperfume?name=${querySearch.get("name")}&page=${perfumesPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setPerfumes(res.data.perfumes);
        setNum(res.data.totalBrandPerfumeCount);
      });
  };

  const setPage = (num: number) => {
    setPerfumesPage(num);
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
          <img src={location.state.brandImage} />
          <TopText>
            <div className="top-text__title">{querySearch.get("name")}</div>
            <div className="top-text__sub-title">
              {location.state.brandName_kr}
            </div>
          </TopText>
        </Top>
        <Text>총 {num}개</Text>
        <Cards>
          {perfumes?.map((el, index) => {
            return (
              <Card>
                <img src={el.perfumeImage} />
                <CardText>
                  <div className="card-text__title">{el.perfumeName}</div>
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
                  border: perfumesPage === index ? "2px solid #bf8dff" : undefined,
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
    </>
  );
};

export default BrandDetail;
