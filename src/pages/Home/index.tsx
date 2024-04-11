import React, { useEffect, useState } from "react";
import {
  Container,
  Main,
  MainTop,
  Select,
  Option,
  MainBottom,
  MainBottomContent,
  ContentText,
  Selected,
  Options,
  PerfumeBox,
  ColorPick,
  SlickSlider,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import Color from "color-thief-react";
import Header from "../../components/Header/index";
import Search from "../../components/Search/index";
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
  const token = localStorage.getItem("my-token");
  const [selectToggle, setSelectToggle] = useState(false);
  const [option, setOption] = useState(0);
  const options = ["봄", "여름", "가을", "겨울"];
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [perfumeLoading, setPerfumeLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [perfumes, setPerfumes] = useState<Perfumes[]>([]);
  const [perfumeIndex, setPerfumeIndex] = useState(0);
  const [randomPerfumes, setRandomPerfumes] = useState<Perfumes[]>([]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 565,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    tokenValidCheck();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isLogin) {
        getUsername();
      } else {
        getRandomPerfume();
      }
    }
  }, [isLoading, isLogin]);

  useEffect(() => {
    if (!isLoading && isLogin) getPerfumeData();
  }, [option, isLogin, isLoading]);

  const tokenValidCheck = () => {
    axios
      .post(
        `${process.env.REACT_APP_API}/token-validation`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data) {
          setIsLoading(false);
          setIsLogin(true);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsLogin(false);
      });
  };

  const getUsername = () => {
    api
      .get(`/username`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsername(res.data))
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getPerfumeData = () => {
    api
      .get(`/recommend?season=${option + 36}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPerfumes(res?.data);
        setPerfumeLoading(false);
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
    if (perfumeIndex + dir === perfumes?.length) setPerfumeIndex(0);
    else if (perfumeIndex + dir === -1) setPerfumeIndex(perfumes?.length - 1);
    else setPerfumeIndex(perfumeIndex + dir);
  };

  /**
   * 랜덤 향수 가져오는 api
   */
  const getRandomPerfume = () => {
    api.get(`/randomperfume`).then((res) => {
      setRandomPerfumes(res.data);
    });
  };

  return (
    <>
      <Container>
        <Header />
        <Search />
        {!isLoading && !perfumeLoading ? (
          isLogin && perfumes?.length > 0 ? (
            <Main>
              <MainTop>
                <div className="main-top__text">'{username}'님을 위한</div>
                <Select>
                  <Selected>{options[option]}</Selected>
                  <Options>
                    {options.map((el, index) => {
                      if (index !== option) {
                        return (
                          <Option onClick={() => handleOptionClick(index)}>
                            {el}
                          </Option>
                        );
                      }
                    })}
                  </Options>
                </Select>
                <div className="main-top__text">향수 추천</div>
              </MainTop>
              <MainBottom>
                <img
                  src="/assets/icon/icon_arrow_left_color.svg"
                  onClick={() => handleSwipeClick(-1)}
                />
                <MainBottomContent
                  onClick={() =>
                    navigate(
                      `/perfumedetail?perfume=${perfumes[perfumeIndex]?.id}`
                    )
                  }
                >
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
                  src="/assets/icon/icon_arrow_right_color.svg"
                  onClick={() => handleSwipeClick(-1)}
                />
              </MainBottom>
            </Main>
          ) : (
            <Main>
              <MainTop>
                <span className="main-top__text--big">“</span>&nbsp;나와 맞는
                &nbsp;
                <span>향수</span>를 찾아보세요.
                <span className="main-top__text--big">”</span>
              </MainTop>
              <MainBottom>
                <SlickSlider {...sliderSettings}>
                  {randomPerfumes?.map((el, index) => (
                    <PerfumeBox
                      key={"perfumebox_" + index}
                      index={index}
                      style={{ display: "flex" }}
                      onClick={() =>
                        navigate(`/perfumedetail?perfume=${el.id}`)
                      }
                    >
                      <div>
                        <img src={el.perfumeImage} />
                      </div>
                      <div className="perfume-box__text">{el.perfumeName}</div>
                      <Color
                        src={`https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=${encodeURIComponent(
                          el.perfumeImage
                        )}`}
                        crossOrigin="anonymous"
                        format={"hex"}
                      >
                        {({ data, loading }) => {
                          if (loading) return <div>{loading}</div>;
                          return (
                            <div>
                              <ColorPick index={index} color={data} />
                            </div>
                          );
                        }}
                      </Color>
                    </PerfumeBox>
                  ))}
                </SlickSlider>
              </MainBottom>
            </Main>
          )
        ) : null}
      </Container>
    </>
  );
};

export default Home;
