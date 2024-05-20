import React, { useCallback, useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Content,
  ContentLogo,
  LoginArea,
  RowArea,
  QuestionRow,
  AnswerRow,
  LoginButton,
  JoinArea,
  JoinTitle,
  JoinButton,
  // @ts-ignore
} from "./styles";
import Header from "../../components/Header/index";
import useApi from "../../hooks/useApi";

const Login = () => {
  const { data: login, loading: loginLoading, error: loginError, fetchApi: fetchLogin } = useApi<any>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const goToHome = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    if (email.length > 0 && password.length > 0) {
      const data = {
        email: email,
        password: password,
      }
      await fetchLogin('post', '/login', data);
    } else {
      alert("모든 항목을 입력해주세요.");
    }
  };

  const handleOnKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(()=>{
    if (login?.token){
      localStorage.setItem("my-token", login.token);
      goToHome();
    }

    if (loginError){
      alert('로그인에 실패하였습니다.');
    }
  },[handleLogin])

  return (
    <>
      <Header />
      <Content>
        <ContentLogo>
          <div className="logo__kr">센카이브</div>
          <div className="logo__en">Scenchive</div>
        </ContentLogo>
        <LoginArea>
          <RowArea>
            <QuestionRow>이메일</QuestionRow>
            <AnswerRow
              type="text"
              placeholder="이메일을 입력해주세요."
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setEmail(e.target.value)}
              onKeyPress={handleOnKeyPress}
            />
          </RowArea>
          <RowArea>
            <QuestionRow>비밀번호</QuestionRow>
            <AnswerRow
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setPassword(e.target.value)}
              onKeyPress={handleOnKeyPress}
            />
          </RowArea>
        </LoginArea>

        <LoginButton onClick={handleLogin}>로그인</LoginButton>

        <JoinArea>
          <JoinTitle>아직 센카이브 회원이 아니신가요?</JoinTitle>
          <JoinButton onClick={() => navigate("/signup")}>회원가입</JoinButton>
        </JoinArea>
      </Content>
    </>
  );
};

export default Login;
