import React, { useEffect, useRef, useState } from 'react';
import {
  PerfumeInformationArea,
  BrandArea,
  BrandNameKR,
  BrandDetailPageIcon,
  PerfumeNameKR,
  PerfumeRating,
} from './styles';
import { PerfumeDetailGroup, PerfumeRatingGroup } from '../../../common/types';
import StarRating from '../StarRating';
import PerfumeRatingBlock from '../PerfumeRatingBlock/index';
import { useNavigate } from 'react-router-dom';

const PerfumeInformation = (props: {
  perfumeDetail: PerfumeDetailGroup | undefined;
  ratesResArr: number[];
  perfumeRating: PerfumeRatingGroup | undefined;
  reviewTotal: number | undefined;
}) => {
  const navigate = useNavigate();

  return (
    <PerfumeInformationArea>
      <BrandArea
        onClick={() =>
          navigate(`/branddetail?name=${props?.perfumeDetail?.brandName}`)
        }
      >
        <BrandNameKR>
          {props?.perfumeDetail?.brandName_kr} ({' '}
          {props?.perfumeDetail?.brandName})
        </BrandNameKR>
        <BrandDetailPageIcon src={'/assets/icon/icon_brand_page.svg'} />
      </BrandArea>
      <PerfumeNameKR>{props?.perfumeDetail?.perfumeName}</PerfumeNameKR>

      <PerfumeRating>
        <StarRating ratesResArr={props?.ratesResArr} />{' '}
        {props?.perfumeRating?.ratingAvg} ({props?.reviewTotal}건)
      </PerfumeRating>

      <PerfumeRatingBlock perfumeRating={props?.perfumeRating} />
    </PerfumeInformationArea>
  );
};

export default PerfumeInformation;
