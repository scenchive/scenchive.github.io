import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderText,
  Title,
  Menu,
  MenuList,
  ContentArea,
  InputRow,
  RowTitle,
  TitleInput,
  MenuInputArea,
  CommunityMenu,
  CommunityContentInput,
  ImageUploadButton,
  WriteButton,



} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";



interface BoardType {
  id: number;
  boardtype_name: string;
  title: string;
}

const CommunityDetail = () => {
  const navigate = useNavigate();
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
    e.persist();
    setCommunityImage(e.target.files[0]
    );
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
        axios.post('/board', data, { headers: { 'Authorization': `Bearer ${myToken}` } })
          .then((res) => {
            console.log('res', res)
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


  useEffect(() => {
    let token = localStorage.getItem('my-token');
    if (token && token.length > 0) {
      axios.post('/token-validation', {}, { headers: { 'Authorization': `Bearer ${token}` } })
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


  return (<>

    <Container>
      <Header>
        <HeaderLeft>
          <Title>
            <div className="title__kr">센카이브</div>
            <div className="title__en">Scenchive</div>
          </Title>
          <Menu>
            <MenuList>마이페이지</MenuList>
            <MenuList>필터 추천</MenuList>
            <MenuList onClick={() => navigate("/community")}>게시판</MenuList>
          </Menu>
        </HeaderLeft>
        <HeaderRight>
          {!myToken ? (
            <>
              <HeaderText onClick={() => navigate("/login")}>로그인</HeaderText>
              <HeaderText>|</HeaderText>
              <HeaderText onClick={() => navigate("/signupstep1")}>
                회원가입
              </HeaderText>
            </>
          ) : (
            <img src="/assets/icon/icon_notice.svg" />
          )}
        </HeaderRight>
      </Header>
      <ContentArea>
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
        <ImageUploadButton
          type="file" name="images" accept=".png, .jpg, image/*"
          onChange={onSelectFile}
        />
        <WriteButton onClick={() => uploadCommunity()}>작성하기</WriteButton>
      </ContentArea>
    </Container>
  </>
  );
};

export default CommunityDetail;
