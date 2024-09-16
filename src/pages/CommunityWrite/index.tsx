import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Container,
  Main,
  PageTitle,
  InputRow,
  RowTitle,
  TitleInput,
  MenuInputArea,
  CommunityMenu,
  CommunityContentInput,
  ImageUplaodArea,
  ImageUploadButtonDesign,
  ImageUploadButton,
  WriteButton,
} from './styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../api';
import Header from '../../components/Header';
import Search from '../../components/Search';
import useApi from '../../hooks/useApi';

interface BoardType {
  id: number;
  boardtype_name: string;
  title: string;
}

const CommunityDetail = () => {
  const navigate = useNavigate();
  const {
    data: checkToken,
    loading: checkTokenLoading,
    error: checkTokenError,
    fetchApi: fetchCheckToken,
  } = useApi<any>();
  const {
    data: postCommunity,
    loading: postCommunityLoading,
    error: postCommunityError,
    fetchApi: fetchPostCommunity,
  } = useApi<any>();

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [myToken, setMyToken] = useState<string | null>();
  const [communityTitle, setCommunityTitle] = useState<string>();
  const [selectedMenu, setSelectedMenu] = useState<string>('전체');
  const [communityContent, setCommunityContent] = useState<string>();
  const [communityImage, setCommunityImage] = useState<any>('');
  const token = localStorage.getItem('my-token');

  const goToLogin = () => {
    alert('로그인이 필요합니다.');
    navigate('/login');
  };

  const onSelectFile = (e: any) => {
    e.preventDefault();
    setCommunityImage(e.target.files[0]);
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

  const uploadCommunity = async () => {
    if (!communityTitle || !communityContent || !selectedMenu) {
      alert('모든 항목을 입력해 주세요.');
      return;
    }

    const data = new FormData();
    if (communityImage !== '') {
      data.append('image', communityImage);
    } else if (communityImage === '') {
      data.append('image', '');
    }

    const requestDto = {
      title: communityTitle,
      body: communityContent,
      boardtype: {
        id: selectedMenu === 'fake' ? 1 : selectedMenu === 'qna' ? 2 : 3,
        boardtype_name: selectedMenu,
      },
    };
    data.append(
      'requestDto',
      new Blob([JSON.stringify(requestDto)], { type: 'application/json' })
    );

    if (myToken) {
      try {
        const res = await fetchPostCommunity('post', '/board', data);
        if (res) {
          alert('게시글이 정상적으로 업로드되었습니다.');
          navigate('/community');
        }
      } catch (error) {
        alert('게시글 업로드에 실패했습니다. 다시 시도해 주세요.');
      }
    } else {
      alert('로그인이 필요합니다.');
      goToLogin();
      return;
    }
  };

  const onCickImageUploadHandler = (): void => {
    imageInputRef.current?.click();
  };

  const menuOptions = [
    { key: 'fake', label: '정/가품' },
    { key: 'qna', label: 'Q & A' },
    { key: 'free', label: '자유' },
  ];

  return (
    <>
      <Container>
        <Header />
        <Search />
        <Main>
          <PageTitle>게시글 작성</PageTitle>
          <InputRow>
            <RowTitle>제목</RowTitle>
            <TitleInput
              onChange={(e) => setCommunityTitle(e.target.value)}
              placeholder="제목을 입력해주세요."
            />
          </InputRow>
          <InputRow>
            <RowTitle>구분</RowTitle>
            <MenuInputArea>
              {menuOptions.map((option) => (
                <CommunityMenu
                  key={option.key}
                  isSelected={selectedMenu === option.key}
                  onClick={() => setSelectedMenu(option.key)}
                >
                  {option.label}
                </CommunityMenu>
              ))}
            </MenuInputArea>
          </InputRow>
          <CommunityContentInput
            onChange={(e) => setCommunityContent(e.target.value)}
          />

          <ImageUplaodArea>
            <ImageUploadButtonDesign onClick={onCickImageUploadHandler}>
              <span
                style={{
                  color: '#616161',
                  fontSize: '1.2rem',
                  fontFamily: 'Noto Sans KR',
                  marginRight: '10px',
                }}
              >
                이미지
              </span>{' '}
              {communityImage?.name ? communityImage.name : '업로드하기'}
            </ImageUploadButtonDesign>
            <ImageUploadButton
              type="file"
              name="images"
              accept=".png, .jpg, image/*"
              ref={imageInputRef}
              id="images"
              onChange={onSelectFile}
            />
          </ImageUplaodArea>

          <WriteButton onClick={() => uploadCommunity()}>작성하기</WriteButton>
        </Main>
      </Container>
    </>
  );
};

export default CommunityDetail;
