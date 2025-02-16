import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnswerRow,
  ChangeButton,
  Container,
  InputArea,
  Main,
  PageTitle,
  QuestionRow,
  RowArea,
} from './styles';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { KeywordType, PerfumeType } from '../../common/types';
import useApi from '../../hooks/useApi';
import { resetUserType } from '../../stores/useUserAuthority';
import Header from '../../common/Header';
import Search from '../../common/Search';

const MyPage = () => {
  const navigate = useNavigate();

  const {
    data: checkToken,
    loading: checkTokenLoading,
    error: checkTokenError,
    fetchApi: fetchCheckToken,
  } = useApi<any>();

  const {
    data: changePasswordData,
    loading: changePasswordLoading,
    error: changePasswordError,
    fetchApi: fetchChangePassword,
  } = useApi<any>();

  const [myToken, setMyToken] = useState<string | null>();
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPassword2, setNewPassword2] = useState<string>('');
  const token = localStorage.getItem('my-token');

  const goToLogin = () => {
    alert('로그인이 필요합니다.');
    navigate('/login');
  };

  /*
   * 토큰 유효성 검사 api를 호출합니다.
   * @author 김민지
   */
  const validateToken = useCallback(async () => {
    if (token && token.length > 0) {
      const res = await fetchCheckToken('post', '/token-validation', {});
      if (res?.length > 0) {
        setMyToken(token);
      } else if (checkTokenError) {
        goToLogin();
      }
    } else {
      goToLogin();
    }
  }, [token]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  const handleOnKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleChangePassword();
    }
  };

  const handleChangePassword = async () => {
    if (
      currentPassword.length > 0 &&
      newPassword.length > 0 &&
      newPassword2.length > 0
    ) {
      if (newPassword !== newPassword2) {
        alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
        return;
      }
      try {
        const data = {
          currentPassword: currentPassword,
          newPassword: newPassword,
        };
        const res = await fetchChangePassword('put', '/password', data);

        if (!res) {
          alert('계정 정보를 정확히 입력해주세요');
        } else {
          if (res === '비밀번호가 일치하지 않습니다.') {
            alert(res);
          } else if (res === '비밀번호가 변경되었습니다.') {
            alert(res);
            navigate('/mypage');
          } else {
            alert(res);
          }
        }
      } catch {
        alert('계정 정보를 정확히 입력해주세요');
      }
    } else {
      alert('모든 항목을 입력해주세요.');
    }
  };

  return (
    <Container>
      <Header />
      <Search />

      <Main>
        <PageTitle>비밀번호 변경</PageTitle>
        <InputArea>
          <RowArea>
            <QuestionRow>현재 비밀번호</QuestionRow>
            <AnswerRow
              type="password"
              placeholder="현재 비밀번호를 입력해주세요."
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setCurrentPassword(e.target.value)}
              onKeyPress={handleOnKeyPress}
            />
          </RowArea>
          <RowArea>
            <QuestionRow>새 비밀번호</QuestionRow>
            <AnswerRow
              type="password"
              placeholder="새 비밀번호를 입력해주세요."
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setNewPassword(e.target.value)}
              onKeyPress={handleOnKeyPress}
            />
          </RowArea>
          <RowArea>
            <QuestionRow>새 비밀번호 확인</QuestionRow>
            <AnswerRow
              type="password"
              placeholder="새 비밀번호를 다시 입력해주세요."
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setNewPassword2(e.target.value)}
              onKeyPress={handleOnKeyPress}
            />
          </RowArea>
        </InputArea>

        <ChangeButton onClick={handleChangePassword}>변경</ChangeButton>
      </Main>
    </Container>
  );
};

export default MyPage;
