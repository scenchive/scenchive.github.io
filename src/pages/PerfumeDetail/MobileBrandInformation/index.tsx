import React, { useEffect, useRef, useState } from 'react';
import {
  PerfumeNameKR,
  MobileBrandPerfumeInformationArea,
  BrandArea,
  BrandNameKR,
  BrandDetailPageIcon,
  PerfumeRating,
} from './styles';

import { PerfumeDetailGroup, PerfumeRatingGroup } from '../../../common/types';
import StarRating from '../StarRating';
import { useNavigate } from 'react-router-dom';

const MobileBrandPerfumeInformation = (props: {
  perfumeDetail: PerfumeDetailGroup | undefined;
  ratesResArr: number[];
  perfumeRating: PerfumeRatingGroup | undefined;
  reviewTotal: number | undefined;
}) => {
  const navigate = useNavigate();

  return (
    <MobileBrandPerfumeInformationArea>
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
    </MobileBrandPerfumeInformationArea>
  );
};

export default MobileBrandPerfumeInformation;
