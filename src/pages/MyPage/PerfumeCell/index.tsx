import React, { useEffect, useState } from "react";
import {
  CellArea,
  PerfumeImage,
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
  
  return (
    <CellArea onClick={()=>navigate(`/perfumedetail?perfume=${props?.Perfume?.perfume_id}`)}>
      <PerfumeImage src={props?.Perfume?.perfumeImage}/>
      <PerfumeNameEnglish  >{props.Perfume.perfume_name}</PerfumeNameEnglish>
      <BrandNameKorean>{props.Perfume.brandName_kr}</BrandNameKorean>
      <BrandNameEnglish>{props.Perfume.brand_name}</BrandNameEnglish>
    </CellArea>
  );
};

export default PerfumeCell;
