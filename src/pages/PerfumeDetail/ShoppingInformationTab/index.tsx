import React, { useEffect, useRef, useState } from "react";
import {
  ShoppingInformationTabArea,
  ShoppingTabTitle,
  WarningBox,
  WarningTitle,
  WarningContent,
  ShoppingInformationRow,
  PerfumeImage,
  ShoppingInformationArea,
  ProductName,
  ShoppingMallName,
  Price,

} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";


interface ShoppingInformation {
  cleanedTitle: string;
  link: string;
  image: string;
  lprice: number;
  mallName: string;
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
      <ShoppingTabTitle>온라인 최저가 쇼핑몰</ShoppingTabTitle>
      <WarningBox>
        <WarningTitle>구매 시 유의사항</WarningTitle>
        <WarningContent>
          센카이브는 고객이 쇼핑몰을 통해 구매한 상품에 대해
          <span style={{color:"#9F53FF"}}>보증하거나 별도의 책임을 지지 않으며,</span>
          상품의 주문, 결제, 배송, 교환, 환불 등 상품판매와 관련한 일체의 책임은 해당 쇼핑몰에 있습니다.
        </WarningContent>
      </WarningBox>
      {props?.shoppingList!==null && props?.shoppingList!==undefined?props?.shoppingList.map((el,index)=>
      <ShoppingInformationRow key={index} onClick={()=>window.open(`${el.link}`)}>
        <PerfumeImage src={el?.image}/>
        <ShoppingInformationArea>
          <ProductName>{el?.cleanedTitle}</ProductName>
          <ShoppingMallName>{el?.mallName}</ShoppingMallName>
          <Price>{el?.lprice}</Price>
        </ShoppingInformationArea>
      </ShoppingInformationRow>
      ):
      <div>"구매 정보가 없습니다."</div>
    }

    </ShoppingInformationTabArea>

  );
};

export default ShoppingInformationTab;