import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  ContentArea,

} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import {api} from "../../api";



interface BoardType {
  id: number;
  boardtype_name: string;
  title: string;
}

const MyActivity = () => {
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





  
  // useEffect(() => {
  //   getCommunity();
  // }, [myToken])


  return (<>

    <Container>
     
      <ContentArea>
       
      </ContentArea>
    </Container>
  </>
  );
};

export default MyActivity;
