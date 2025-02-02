import React, { useEffect, useState } from 'react';
import {
  Top5Area,
  ReviewTop5PerfumeListArea,
  Top5BrandListListArea,
} from './Top5.styles';
import { useNavigate } from 'react-router-dom';
import Top5ReviewPerfumeList from '../Top5ReviewPerfumeList/Top5ReviewPerfumeList';
import Top5BrandList from '../Top5BrandList/Top5BrandList';

interface Perfumes {
  perfumeId: number;
  perfumeName: string;
  brandName: string;
  reviewCount: number;
}

const Top5 = (props: { reviewTop5PerfumeList: Perfumes[] }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('my-token');

  return (
    <Top5Area>
      <ReviewTop5PerfumeListArea>
        {props.reviewTop5PerfumeList && (
          <Top5ReviewPerfumeList
            reviewTop5PerfumeList={props?.reviewTop5PerfumeList}
          />
        )}
      </ReviewTop5PerfumeListArea>
      <Top5BrandListListArea>
        {props.reviewTop5PerfumeList && (
          <Top5BrandList reviewTop5PerfumeList={props?.reviewTop5PerfumeList} />
        )}
      </Top5BrandListListArea>
    </Top5Area>
  );
};

export default Top5;
