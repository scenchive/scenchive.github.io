import React, { useEffect, useState } from "react";
import {
  CellArea,
  PerfumeImage,
  PerfumeNameKorean,
  PerfumeNameEnglish,
  BrandNameKorean,
  BrandNameEnglish,
} from "./styles";
import { useNavigate } from "react-router-dom";

interface PerfumeType{
  perfume_id:number;
  perfume_name:string;
  perfumeImage:string;
  brand_name:string;
  brandName_kr:string;
}

const PerfumeCell = (props:{Perfume:PerfumeType}) => {
  const navigate = useNavigate();
  console.log('params',props.Perfume)
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



  return (
    <CellArea>
      <PerfumeImage/>
      <PerfumeNameKorean>{props.Perfume.brandName_kr}</PerfumeNameKorean>
      <PerfumeNameEnglish>{props.Perfume.perfume_name}</PerfumeNameEnglish>
      <BrandNameKorean>{props.Perfume.brandName_kr}</BrandNameKorean>
      <BrandNameEnglish>{props.Perfume.brand_name}</BrandNameEnglish>
    </CellArea>
  );
};

export default PerfumeCell;
