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
} from "./styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [selectToggle, setSelectToggle] = useState(false);
  const [option, setOption] = useState("봄");
  const options = ["봄", "여름", "가을", "겨울"];
  const perfumes = useState([]);

  useEffect(() => {}, [option]);

  /**
   * @todo 실제 로그인 여부 확인
   */
  const isLogin = false;

  /**
   * @todo 추천 향수 데이터 가져오는 api 호출
   */
  const getPerfumeData = async () => {
    await axios.get(`/recommand/season=${option}`);
  };

  const handleSelectClick = () => {
    setSelectToggle(!selectToggle);
  };

  const handleOptionClick = (val: string) => {
    setOption(val);
    handleSelectClick();
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
          {!isLogin ? (
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
        <Search>
          <input
            type="text"
            className="search__input"
            placeholder="향수 이름 혹은 브랜드 명을 검색하세요"
          />
          <img src="/assets/icon/icon_search.svg" className="search__img" />
        </Search>
      </Top>
      <Main>
        <MainTop>
          <div className="main-top__text">'김민지'님을 위한</div>
          <Select>
            <img
              src={
                selectToggle
                  ? "/assets/icon/icon_arrow_up.svg"
                  : "/assets/icon/icon_arrow_down.svg"
              }
            />
            <Option onClick={handleSelectClick}>{option}</Option>
            {selectToggle &&
              options.map((el) => {
                if (el !== option) {
                  return (
                    <Option
                      style={{ color: "#8D8D8D" }}
                      onClick={() => handleOptionClick(el)}
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
          <img src="/assets/icon/icon_arrow_left.svg" />
          <MainBottomContent>
            <img src="https://shop.dior.co.kr/cdn/shop/products/3348901627351_0.jpg?crop=center&height=1000&v=1671502598&width=1500" />
            <ContentText>
              <div className="content-text__name">
                바카라 루쥬 540 오 드 퍼퓸
              </div>
              <div className="content-text__brand-kr">메종 프란시스 커정</div>
              <div className="content-text__brand-en">
                Maison Francis Kurkdjian
              </div>
              <div className="content-text__rate">
                <img src="/assets/icon/icon_star.svg" />
                <div>4.8 / 5</div>
              </div>
            </ContentText>
          </MainBottomContent>
          <img src="/assets/icon/icon_arrow_right.svg" />
        </MainBottom>
      </Main>
    </Container>
  );
};

export default Home;
