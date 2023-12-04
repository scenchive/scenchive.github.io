import React, { useEffect, useRef, useState } from "react";
import {
  ShoppingInformationTabArea,
  ShoppingInformationRow,
  PerfumeImage,
  ShoppingInformationArea,
  ProductName,
  ShoppingMallName,
  Price,

} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";


interface ShoppingInformation{
  cleanedTitle:string;
  link:string;
  image:string;
  lprice:number;
  mallName:string;
}


const ShoppingInformationTab = (
  props: {
    shoppingList: ShoppingInformation[] | null | undefined
  }
) => {
  const navigate = useNavigate();
  const [myToken, setMyToken] = useState<string | null>();
  const [querySearch, setQuerySearch] = useSearchParams();
  const [perfumeId, setPerfumeId] = useState<number | null | undefined>();

  /**
   * @todo 실제 로그인 여부 확인
   */
  const isLogin = false;

  const goToHome = () => {
    navigate("/")
  }

  const goToLogin = () => {
    navigate("/login")
  }

  useEffect(() => {
    let perfumeIdProps: null | string | number = querySearch.get("perfume")
    if (perfumeIdProps !== null) {
      perfumeIdProps = parseInt(perfumeIdProps);
      setPerfumeId(perfumeIdProps)
    }
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

  


  return (
    <ShoppingInformationTabArea>


      {props?.shoppingList!==null && props?.shoppingList!==undefined
      ? props?.shoppingList.map((el, index)=>


      // navigate(`/perfumedetail?perfume=${perfumes[perfumeIndex]?.id}`)


        <ShoppingInformationRow key={index} onClick={()=>window.open(`${el.link}`)}>
          <PerfumeImage src={el?.image}/>
          <ShoppingInformationArea>
            <ProductName>{el?.cleanedTitle}</ProductName>
            <ShoppingMallName>{el?.mallName}</ShoppingMallName>
            <Price>{el?.lprice}</Price>
          </ShoppingInformationArea>

        </ShoppingInformationRow>

      )
      : <div>"구매 정보가 없습니다."</div>
    }


    </ShoppingInformationTabArea>
  );};

export default ShoppingInformationTab;
