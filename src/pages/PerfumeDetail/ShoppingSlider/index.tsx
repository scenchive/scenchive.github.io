import React, { useEffect, useRef, useState } from "react";
import {
  ShoppingCell,
  ShoppingImage,
  ShoppingInfo,
  MallName,
  GoodsTitle,
  Price,

} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface ShoppingInformation {
  cleanedTitle: string;
  link: string;
  image: string;
  lprice: number;
  mallName: string;
}


const ShoppingSlider = (
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

  const settings = {
    dots: false,
    autoplay: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <img src={"/assets/icon/icon_arrow_left.svg"}/> ,
    nextArrow: <img src={"/assets/icon/icon_arrow_right.svg"}/>,

  }

  return (
    <div style={{ width: "100%", display:"flex", flexDirection:"row" }}>
      {props?.shoppingList ? props?.shoppingList.length <=5 ?
      props?.shoppingList.map((item, index)=>(
        <ShoppingCell key={index} onClick={()=>window.open(item?.link)}>
        <ShoppingImage src={item?.image} />
        <ShoppingInfo>
          <MallName>{item?.mallName}</MallName>
          <GoodsTitle>{item?.cleanedTitle}</GoodsTitle>
          <Price>{item?.lprice.toLocaleString('ko-KR')} 원</Price>
        </ShoppingInfo>
      </ShoppingCell>
      ))
    : 
        <Slider {...settings}>
        {props?.shoppingList?.map((item, index) => (
          <ShoppingCell key={index} onClick={()=>window.open(item?.link)}>
            <ShoppingImage src={item?.image} />
            <ShoppingInfo>
              <MallName>{item?.mallName}</MallName>
              <GoodsTitle>{item?.cleanedTitle}</GoodsTitle>
              <Price>{item?.lprice.toLocaleString('ko-KR')} 원</Price>
            </ShoppingInfo>
          </ShoppingCell>
        ))}
      </Slider>
      : <div> 구매 정보가 없습니다. </div>
  }


    </div>


  );
};

export default ShoppingSlider;