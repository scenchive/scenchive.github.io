import React, { useEffect, useState } from 'react';
import {
  ProfileArea,
  ProfileImage,
  NameEmailArea,
  NameEmailAreaTop,
  UserInformationArea,
  ProfileChangeButton,
  ButtonArea,
  Splitter,
  ProfileButton,
  SettingIcon,
} from './styles';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import { resetUserType } from '../../../stores/useUserAuthority';
import useApi from '../../../hooks/useApi';

interface KeywordType {
  id: number;
  utag: string;
  utag_kr: string;
  utagtype_id: number;
}

const Profile = (props: {
  imageUrl: string;
  name: string | null | undefined;
  email: string | null | undefined;
  setIsModalOpen2: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const {
    data: logout,
    loading: logoutLoading,
    error: logoutError,
    fetchApi: fetchLogout,
  } = useApi<any>();
  const {
    data: checkToken,
    loading: checkTokenLoading,
    error: checkTokenError,
    fetchApi: fetchCheckToken,
  } = useApi<any>();
  const [myToken, setMyToken] = useState<string | null>();

  const token = localStorage.getItem('my-token');
  const goToLogin = () => {
    alert('로그인이 필요합니다.');
    navigate('/login');
  };
  /*
   * 토큰 유효성 검사 api를 호출합니다.
   * @author 김민지
   */
  const validateToken = async () => {
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
  };

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  // 로그아웃 api
  const handleLogout = async () => {
    if (myToken && myToken.length > 0) {
      try {
        const res = await fetchLogout('post', '/service-logout', {});
        if (res) {
          resetUserType();
          localStorage.removeItem('my-token');
          alert('로그아웃되었습니다.');
          navigate('/login');
        }
      } catch (error) {
        alert('로그아웃이 정상적으로 처리되지 않았습니다. 다시 시도해주세요.');
      }
    }
  };
  return (
    <ProfileArea>
      <ProfileImage src={props.imageUrl} />
      <NameEmailArea>
        <NameEmailAreaTop>
          <UserInformationArea>
            <div className="name_text" style={{ marginRight: '10px' }}>
              {props.name}
            </div>
            <ProfileChangeButton onClick={() => props.setIsModalOpen2(true)}>
              프로필 수정하기
            </ProfileChangeButton>
            <Splitter
              isPink={false}
              isLogin={false}
              style={{ fontSize: '1rem', marginTop: 'auto' }}
            >
              |
            </Splitter>
            <ProfileChangeButton onClick={() => navigate('/changepassword')}>
              비밀번호 변경
            </ProfileChangeButton>
            <Splitter
              isPink={false}
              isLogin={false}
              style={{ fontSize: '1rem', marginTop: 'auto' }}
            >
              |
            </Splitter>
            <ProfileChangeButton onClick={() => handleLogout()}>
              로그아웃
            </ProfileChangeButton>
          </UserInformationArea>

          <div className="email_text">{props.email}</div>
        </NameEmailAreaTop>

        <ButtonArea>
          <ProfileButton isPink={true} isLogin={false}>
            나의 보유 향수
          </ProfileButton>
          <Splitter isPink={false} isLogin={false}>
            |
          </Splitter>
          <ProfileButton
            onClick={() => navigate('/myBoards')}
            isPink={true}
            isLogin={false}
          >
            내가 작성한 게시글
          </ProfileButton>
          <Splitter isPink={false} isLogin={false}>
            |
          </Splitter>
          <ProfileButton
            onClick={() => navigate('/myComments')}
            isPink={true}
            isLogin={false}
          >
            내가 작성한 댓글
          </ProfileButton>
        </ButtonArea>
      </NameEmailArea>
    </ProfileArea>
  );
};

export default Profile;
