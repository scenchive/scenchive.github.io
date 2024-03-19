import React, { useEffect, useRef, useState } from "react";
import {
  SliderContainer,
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
    slidesToScroll: 5,
    initialSlide: 0,
    prevArrow: <img src={"/assets/icon/icon_arrow_left.svg"} style={{ width: "20px", height: "20px" }} />,
    nextArrow: <img src={"/assets/icon/icon_arrow_right.svg"} style={{ width: "20px", height: "20px" }} />,
    responsive: [
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div style={{ width: "calc( 100% - 40px )" }}>
      {props?.shoppingList ? props?.shoppingList.length <= 5 ?
        <div style={{display:"flex", flexDirection:"row"}}>
          {props?.shoppingList.map((item, index) => (
            <ShoppingCell key={'less' + index} onClick={() => window.open(item?.link)}>
              <ShoppingImage src={item?.image} />
              <ShoppingInfo>
                <MallName>{item?.mallName}</MallName>
                <GoodsTitle>{item?.cleanedTitle}</GoodsTitle>
                <Price>{item?.lprice.toLocaleString('ko-KR')} 원</Price>
              </ShoppingInfo>
            </ShoppingCell>
          ))}
        </div>
        :
        <SliderContainer>
          <Slider {...settings}>
            {props?.shoppingList?.map((item, index) => (
              <ShoppingCell style={{ width: "calc ( 100% - 40px )" }} key={'more' + index} onClick={() => window.open(item?.link)}>
                <ShoppingImage src={item?.image} />
                <ShoppingInfo>
                  <MallName>{item?.mallName}</MallName>
                  <GoodsTitle>{item?.cleanedTitle}</GoodsTitle>
                  <Price>{item?.lprice.toLocaleString('ko-KR')} 원</Price>
                </ShoppingInfo>
              </ShoppingCell>
            ))}
          </Slider>
        </SliderContainer>
        : <div> 구매 정보가 없습니다. </div>
      }


    </div>


  );
};

export default ShoppingSlider;