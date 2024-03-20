import React, { useEffect, useState } from "react";
import {
  Container,
  Main,
  PageNotFoundNotice,
  HomeButton,


} from "./styles";
import { useNavigate } from "react-router-dom";
import {api} from "../../api";
import Header from "../../components/Header/index";
import Search from "../../components/Search/index";


const NotFound = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);


  const getToken = () => {
    const token = localStorage.getItem("my-token");
    setToken(token);
  };

  useEffect(() => {
    getToken();
  }, []);


  return (
    <>
      <Container>
        <Header />
        <Search />
        <Main width={"60%"}>
          <PageNotFoundNotice>페이지를 찾을 수 없습니다.</PageNotFoundNotice>
          <HomeButton onClick={()=>navigate("/")}><img src="/assets/icon/icon_home.svg"/>홈화면으로 이동</HomeButton>

        </Main>

      </Container>
    </>
  );
};

export default NotFound;
