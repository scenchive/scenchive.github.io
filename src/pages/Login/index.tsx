import React, { useRef } from "react";
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
// import ApiService from "../ApiService.js";
import {api} from "../../api";
import Header from "../../components/Header/index";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const goToHome = () => {
    navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };

  const Login = async () => {
    if (email.length > 0 && password.length > 0) {
      const data = {
        email: email,
        password: password,
      }
      await api.post('/login', data)
        .then((res) => {
          if (res.data.token) {
            console.log("로그인 성공했습니다.");
            localStorage.setItem("my-token", res.data.token);
            goToHome();
          }else{
            alert('로그인에 실패하였습니다.');
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      alert("모든 항목을 입력해주세요.");
    }
  };

  const handleOnKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      Login();
    }
  };
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

        <LoginButton onClick={Login}>로그인</LoginButton>

        <JoinArea>
          <JoinTitle>아직 센카이브 회원이 아니신가요?</JoinTitle>
          <JoinButton onClick={() => navigate("/signup")}>회원가입</JoinButton>
        </JoinArea>
      </Content>
    </>
  );
};

export default Login;
