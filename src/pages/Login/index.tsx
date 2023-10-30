import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Header,
  Content,
  LoginArea,
  RowArea,
  QuestionRow,
  AnswerRow,
  LoginButton,
}
  // @ts-ignore
  from './styles.tsx';
// import ApiService from "../ApiService.js";
import axios from "axios";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const goToHome = () => {
    navigate("/")
  }
  const goBack = () => {
    navigate(-1);
  }
  const Login = async () => {
    const data={
      email:email,
      password:password,
    }
    await axios.post('/login', data)
    .then((res)=>{
      console.log(res)
      if (res.data.token){
        console.log('로그인 성공했습니다.')
      }
      goToHome();
    })
    
  

  }


  return (
    <div>
      <Header>로그인</Header>
      <Content>
        <LoginArea>
          <RowArea>
            <QuestionRow>이메일</QuestionRow>
            <AnswerRow type="text" onChange={(e: { target: { value: React.SetStateAction<string>; }; })=>setEmail(e.target.value)}/>
          </RowArea>
          <RowArea>
            <QuestionRow>비밀번호</QuestionRow>
            <AnswerRow type="password" onChange={(e: { target: { value: React.SetStateAction<string>; }; })=>setPassword(e.target.value)} />
          </RowArea>

        </LoginArea>

        <LoginButton onClick={Login}>로그인</LoginButton>
      </Content>
    </div>
  );
};

export default Login;