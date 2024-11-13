// @ts-ignore
import React, { useCallback, useRef } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/index';
import useFindPassword from '../../hooks/auth/useFindPassword';
import useApi from '../../hooks/useApi';
import useUserTypeStore from '../../stores/useUserAuthority';

import {
  Content,
  ContentLogo,
  LoginArea,
  Notice,
  RowArea,
  QuestionRow,
  AnswerRow,
  AlertMessage,
  LoginButton,
  JoinArea,
  JoinTitle,
  JoinButton,
} from './styles';

const FindPassword = () => {
  const { setUserType, userType } = useUserTypeStore(); // Zustand에서 setUserType 가져오기

  const {
    data: login,
    loading: loginLoading,
    error: loginError,
    fetchApi: fetchLogin,
  } = useApi<any>();
  const { fetchApi: fetchUserType } = useApi<any>();

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [emailMessage, setEmailMessage] = useState<string>('');

  const goToHome = () => {
    navigate('/');
  };

  const onChangeEmail = (e: { target: { value: string } }) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegularExpression = new RegExp(
      '[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$'
    );
    if (e.target.value.length === 0) {
      setEmailMessage('이메일을 입력해주세요');
      setIsEmailValid(false);
    } else {
      if (!emailRegularExpression.test(currentEmail)) {
        setEmailMessage('이메일 형식에 맞게 입력해 주세요.');
        setIsEmailValid(false);
      } else {
        setEmailMessage('');
        setIsEmailValid(true);
      }
    }
  };

  const { findPassword } = useFindPassword({
    email,
  });

  const handleFindPassword = () => {
    if (isEmailValid) {
      findPassword();
    } else {
      alert('이메일을 정확히 입력해주세요');
    }
  };

  const handleOnKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleFindPassword();
    }
  };

  const fetchUserTypeData = async () => {
    const userTypeData = await fetchUserType('get', `/user/${email}`);
    if (userTypeData && userTypeData.authorityDtoSet) {
      const authorityName = userTypeData.authorityDtoSet[0].authorityName;
      setUserType(authorityName);
    }
    goToHome();
  };

  useEffect(() => {
    if (login?.token) {
      localStorage.setItem('my-token', login.token);
      fetchUserTypeData();
    }

    if (loginError) {
      alert('로그인에 실패하였습니다.');
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
          <Notice>
            입력하신 이메일로
            <br />
            임시 비밀번호가 발급됩니다.
            <br /> 마이페이지에서 비밀번호를 재설정해주세요.
          </Notice>
          <RowArea>
            <QuestionRow>이메일</QuestionRow>
            <AnswerRow
              type="text"
              placeholder="이메일을 입력해주세요."
              onChange={onChangeEmail}
              onKeyPress={handleOnKeyPress}
            />
            <AlertMessage>{emailMessage}</AlertMessage>
          </RowArea>
        </LoginArea>

        <LoginButton onClick={handleFindPassword}>전송</LoginButton>

        <JoinArea>
          <JoinTitle>아직 센카이브 회원이 아니신가요?</JoinTitle>
          <JoinButton onClick={() => navigate('/signup')}>회원가입</JoinButton>
        </JoinArea>
      </Content>
    </>
  );
};

export default FindPassword;
