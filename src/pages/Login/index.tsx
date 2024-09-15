// @ts-ignore
import React, { useCallback, useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/index";
import useApi from "../../hooks/useApi";
import useUserTypeStore from "../../stores/useUserAuthority";

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
} from "./styles";

const Login = () => {
  const { setUserType, userType } = useUserTypeStore(); // Zustand에서 setUserType 가져오기

  const {
    data: login,
    loading: loginLoading,
    error: loginError,
    fetchApi: fetchLogin,
  } = useApi<any>();
  const { fetchApi: fetchUserType } = useApi<any>();

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
      };
      try {
        const res = await fetchLogin("post", "/login", data);
        if (!res) {
          alert("계정 정보를 정확히 입력해주세요");
        }
      } catch {
        alert("계정 정보를 정확히 입력해주세요");
      }
    } else {
      alert("모든 항목을 입력해주세요.");
    }
  };

  const handleOnKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const fetchUserTypeData = async () => {
    const userTypeData = await fetchUserType("get", `/user/${email}`);
    if (userTypeData && userTypeData.authorityDtoSet) {
      const authorityName = userTypeData.authorityDtoSet[0].authorityName;
      setUserType(authorityName);
    }
    goToHome();
  };

  useEffect(() => {
    if (login?.token) {
      localStorage.setItem("my-token", login.token);
      fetchUserTypeData();
    }

    if (loginError) {
      alert("로그인에 실패하였습니다.");
    }
  }, [login?.token, loginError]);

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
