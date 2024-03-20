import React, { useEffect, useRef, useState } from "react";
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
} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import {api} from "../../api";
import Header from "../../components/Header";
import Search from "../../components/Search";


interface BoardType {
  id: number;
  boardtype_name: string;
  title: string;
}

const CommunityDetail = () => {
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [myToken, setMyToken] = useState<string | null>();
  const [querySearch, setQuerySearch] = useSearchParams();
  const [communityTitle, setCommunityTitle] = useState<string>();
  const [selectedMenu, setSelectedMenu] = useState<string>("전체");
  const [communityContent, setCommunityContent] = useState<string>();
  const [communityImage, setCommunityImage] = useState<any>('');


  const goToHome = () => {
    navigate("/")
  }

  const goToLogin = () => {
    navigate("/login")
  }

  const onSelectFile = (e: any) => {
    e.preventDefault();
    setCommunityImage(e.target.files[0]);
  }

  const uploadCommunity = () => {
    if (communityTitle && communityContent && selectedMenu) {
      let data = new FormData();
      if (communityImage !== "") {
        data.append('image', communityImage);
      } else if (communityImage === "") {
        data.append('image', "");
      }
      let requestDto = {
        title: communityTitle,
        body: communityContent,
        boardtype: {
          id: selectedMenu === 'fake' ? 1 : selectedMenu === "qna" ? 2 : 3,
          boardtype_name: selectedMenu,
        }
      }
      data.append("requestDto", new Blob([JSON.stringify(requestDto)], { type: "application/json" }))

      if (myToken) {
        api.post('/board', data, { headers: { 'Authorization': `Bearer ${myToken}` } })
          .then((res) => {
            navigate('/community');
          })
          .catch((err) => {
            console.error('err', err)
          })
      }
    } else {
      alert('모든 항목을 입력해 주세요.')
    }
  }

  const onCickImageUploadHandler = (): void => {
    imageInputRef.current?.click();
  };

  useEffect(() => {
    let token = localStorage.getItem('my-token');
    if (token && token.length > 0) {
      api.post('/token-validation', {}, { headers: { 'Authorization': `Bearer ${token}` } })
        .then((res) => {
          if (res.data.length > 0) {
            setMyToken(token);
          } else {
            goToLogin();
          }
        })
        .catch((err) => {
          goToLogin();
        })
    } else {
      goToLogin();
    }
  }, [])

  useEffect(() => {
  }, [myToken])


  return (
    <>
      <Container>
        <Header />
        <Search />
        <Main>
          <PageTitle>게시글 작성</PageTitle>
          <InputRow>
            <RowTitle>제목</RowTitle>
            <TitleInput onChange={(e) => setCommunityTitle(e.target.value)} placeholder="제목을 입력해주세요." />
          </InputRow>
          <InputRow>
            <RowTitle>구분</RowTitle>
            <MenuInputArea>
              <CommunityMenu isSelected={selectedMenu === "fake"} onClick={() => setSelectedMenu('fake')}>정/가품</CommunityMenu>
              <CommunityMenu isSelected={selectedMenu === "qna"} onClick={() => setSelectedMenu("qna")}>Q & A</CommunityMenu>
              <CommunityMenu isSelected={selectedMenu === "free"} onClick={() => setSelectedMenu('free')}>자유</CommunityMenu>
            </MenuInputArea>
          </InputRow>
          <CommunityContentInput onChange={(e) => setCommunityContent(e.target.value)} />

          <ImageUplaodArea >
            <ImageUploadButtonDesign onClick={onCickImageUploadHandler}>
              <span style={{ color: "#616161", fontSize: "1.2rem", fontFamily: "Noto Sans KR", marginRight: "10px" }}>이미지</span> {communityImage?.name ? communityImage.name : "업로드하기"}
            </ImageUploadButtonDesign>
            <ImageUploadButton
              type="file" name="images" accept=".png, .jpg, image/*"
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
