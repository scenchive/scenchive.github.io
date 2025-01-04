import React, { useEffect, useState } from 'react';
import {
  PerfumeRowArea,
  PerfumeImage,
  PerfumeInfo,
  BrandNameArea,
  BrandNameKorean,
  BrandNameEnglish,
  PerfumeName,
} from './PerfumeRow.style';
import { useNavigate } from 'react-router-dom';
import Color from 'color-thief-react';

import axios from 'axios';
import Ranking from '../Ranking';

interface PerfumesInfo {
  brandId?: number;
  brandImage?: string | null;
  brandName: string;
  brandName_kr?: string;
  perfumeId: number;
  perfumeImage?: string;
  perfumeName: string;
  perfume_kr?: string | null | undefined;
  addStyle?: string;
}

const PerfumeRow = (props: {
  isMobile: boolean;
  index: number;
  perfumeInformation: PerfumesInfo;
  ImgWidth: number;
  ImgHeight: number;
  flexDirection: 'column' | 'row';
  BrandNameKoreanFontSize: number;
  BrandNameEnglishFontSize: number;
  PerfumeNameFontSize: number;
  addStyle?: string;
}) => {
  return (
    <PerfumeRowArea addStyle={props?.addStyle}>
      <Ranking index={props?.index} width={props.isMobile ? '35px' : '40px'} />
      <PerfumeImage
        src={
          props?.perfumeInformation?.perfumeImage
            ? props?.perfumeInformation?.perfumeImage
            : '/assets/image/image_perfume.svg'
        }
        width={props?.ImgWidth}
        height={props?.ImgHeight}
      />
      <PerfumeInfo>
        <BrandNameArea flexDirection={props?.flexDirection}>
          <BrandNameKorean fontSize={props?.BrandNameKoreanFontSize}>
            {props?.perfumeInformation?.brandName_kr}
          </BrandNameKorean>

          <BrandNameEnglish fontSize={props?.BrandNameEnglishFontSize}>
            ({props?.perfumeInformation?.brandName})
          </BrandNameEnglish>
        </BrandNameArea>
        <PerfumeName fontSize={props?.PerfumeNameFontSize}>
          {props?.perfumeInformation?.perfumeName}
          {props?.perfumeInformation?.perfume_kr && (
            <span>({props?.perfumeInformation?.perfume_kr})</span>
          )}
        </PerfumeName>
      </PerfumeInfo>
    </PerfumeRowArea>
  );
};

export default PerfumeRow;
