import React, { useEffect, useState } from 'react';
import { Top5Area, ReviewTop5PerfumeListArea } from './Top5.styles';
import { useNavigate } from 'react-router-dom';
import ReviewTop5PerfumeList from '../ReviewTop5PerfumeList/ReviewTop5PerfumeList';

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
          <ReviewTop5PerfumeList
            reviewTop5PerfumeList={props?.reviewTop5PerfumeList}
          />
        )}
      </ReviewTop5PerfumeListArea>
    </Top5Area>
  );
};

export default Top5;
