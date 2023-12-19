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
  MenuArea,
  CommunityMenu,
  CommunityArea, 
  CommunityRow,
  RowNumber,
  RowMenu,
  RowTitle,
  WriteButton,
  

} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";



interface BoardType {
  id: number;
  boardtype_name: string;
  title: string;
}

const Community = () => {
  const navigate = useNavigate();
  const [myToken, setMyToken] = useState<string | null>();
  const [querySearch, setQuerySearch] = useSearchParams();
  const [selectedMenu, setSelectedMenu]=useState<string>("전체");
  const [boardCount, setBoardCount]=useState<number>();
  const [boardList, setBoardList]=useState<BoardType[]>();
  const [fakeBoardCount, setFakeBoardCount]=useState<number>();
  const [fakeBoardList, setFakeBoardList]=useState<BoardType[]>();
  const [qnaBoardCount, setQnaBoardCount]=useState<number>();
  const [qnaBoardList, setQnaBoardList]=useState<BoardType[]>();
  const [freeBoardCount, setFreeBoardCount]=useState<number>();
  const [freeBoardList, setFreeBoardList]=useState<BoardType[]>();


  const goToHome = () => {
    navigate("/")
  }

  const goToLogin = () => {
    navigate("/login")
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




  const getCommunity=()=>{
    if (myToken && myToken.length > 0) {
      axios.get('/boards?page=0', { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          setBoardCount(res?.data?.totalBoardCount);
          setBoardList(res?.data?.boards)
        }).catch((res) => {
          console.log(res)
          alert('로그인 후 이용 가능합니다.')
          goToHome();
        })

        axios.get('/boardtype/1?page=0', { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          setQnaBoardCount(res?.data?.totalBoardCount);
          setQnaBoardList(res?.data?.boards)
        }).catch((res) => {
          console.log(res)
          alert('로그인 후 이용 가능합니다.')
          goToHome();
        })

        axios.get('/boardtype/2?page=0', { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          setFakeBoardCount(res?.data?.totalBoardCount);
          setFakeBoardList(res?.data?.boards)
        }).catch((res) => {
          console.log(res)
          alert('로그인 후 이용 가능합니다.')
          goToHome();
        })

        axios.get('/boardtype/3?page=0', { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          setFreeBoardCount(res?.data?.totalBoardCount);
          setFreeBoardList(res?.data?.boards)
        }).catch((res) => {
          console.log(res)
          alert('로그인 후 이용 가능합니다.')
          goToHome();
        })
    }

  }

  
  useEffect(() => {
    getCommunity();
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
            <MenuList onClick={()=>navigate("/community")}>게시판</MenuList>
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
      <MenuArea>
        <CommunityMenu onClick={()=>setSelectedMenu("전체")} style={{color:selectedMenu==="전체"?"red":"black"}}>전체</CommunityMenu>
        <CommunityMenu onClick={()=>setSelectedMenu("정/가품")} style={{color:selectedMenu==="정/가품"?"red":"black"}}>정/가품</CommunityMenu>
        <CommunityMenu onClick={()=>setSelectedMenu("Q & A")} style={{color:selectedMenu==="Q & A"?"red":"black"}}>Q & A</CommunityMenu>
        <CommunityMenu onClick={()=>setSelectedMenu("자유")} style={{color:selectedMenu==="자유"?"red":"black"}}>자유</CommunityMenu>
      </MenuArea>
      <ContentArea>
       <CommunityArea>
       
        <CommunityRow>
          <RowNumber>번호</RowNumber>
          <RowMenu>구분</RowMenu>
          <RowTitle>제목</RowTitle>
        </CommunityRow>
        {
          selectedMenu==="전체"?
          boardList?.map((el, index)=>
          <CommunityRow key={index} onClick={()=> navigate('/communitydetail?detail='+el?.id)}>
            <RowNumber>{index+1}</RowNumber>
            <RowMenu>{el?.boardtype_name==="fake"? "정/가품": el?.boardtype_name==="qna"? "Q & A": "자유"}</RowMenu>
            <RowTitle>{el?.title}</RowTitle>
            </CommunityRow>)
            : selectedMenu==="정/가품"?
            fakeBoardList?.map((el, index)=>el?.boardtype_name==="fake"?
            <CommunityRow key={index} onClick={()=> navigate('/communitydetail?detail='+el?.id)}>
            <RowNumber>{index+1}</RowNumber>
            <RowMenu>정/가품</RowMenu>
            <RowTitle>{el?.title}</RowTitle>
            </CommunityRow>:null)
            :selectedMenu==="Q & A"?
            qnaBoardList?.map((el, index)=>el?.boardtype_name==="qna"?
            <CommunityRow key={index} onClick={()=> navigate('/communitydetail?detail='+el?.id)}>
            <RowNumber>{index+1}</RowNumber>
            <RowMenu>Q & A</RowMenu>
            <RowTitle>{el?.title}</RowTitle>
            </CommunityRow>:null)
            : freeBoardList?.map((el, index)=>el?.boardtype_name==="free"?
            <CommunityRow key={index} onClick={()=> navigate('/communitydetail?detail='+el?.id)}>
            <RowNumber>{index+1}</RowNumber>
            <RowMenu>자유</RowMenu>
            <RowTitle>{el?.title}</RowTitle>
            </CommunityRow>:null)
        }

       </CommunityArea>
       <WriteButton onClick={()=>navigate('/communitywrite')}>작성하기</WriteButton>
      </ContentArea>
    </Container>
  </>
  );
};

export default Community;
