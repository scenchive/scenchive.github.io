import React, { useEffect, useState } from 'react';
import {
  BrandRowArea,
  BrandImage,
  BrandInfo,
  BrandNameArea,
  BrandNameKorean,
  BrandNameEnglish,
  BrandName,
} from './BrandRow.style';

import Ranking from '../Ranking';

interface BrandInfo {
  brandId: number;
  brandName: string | null;
  brandName_kr: string | null;
  brandImage: string | null;
}

const BrandRow = (props: {
  isMobile: boolean;
  index: number | undefined;
  brandInformation: BrandInfo;
  ImgWidth: number;
  ImgHeight: number;
  flexDirection: 'column' | 'row';
  BrandNameKoreanFontSize: number;
  BrandNameEnglishFontSize: number;
  BrandNameFontSize: number;
  addStyle?: string;
}) => {
  return (
    <BrandRowArea addStyle={props?.addStyle}>
      {props.index !== undefined && (
        <Ranking
          index={props?.index}
          width={props.isMobile ? '35px' : '40px'}
        />
      )}
      <BrandImage
        src={
          props?.brandInformation?.brandImage
            ? props?.brandInformation?.brandImage
            : '/assets/image/image_perfume.svg'
        }
        width={props?.ImgWidth}
        height={props?.ImgHeight}
      />
      <BrandInfo>
        <BrandNameArea flexDirection={props?.flexDirection}>
          <BrandNameEnglish fontSize={props?.BrandNameEnglishFontSize}>
            {props?.brandInformation?.brandName}
          </BrandNameEnglish>
        </BrandNameArea>
        <BrandName fontSize={props?.BrandNameFontSize}>
          {props?.brandInformation?.brandName_kr && (
            <span>{props?.brandInformation?.brandName_kr}</span>
          )}
        </BrandName>
      </BrandInfo>
    </BrandRowArea>
  );
};

export default BrandRow;
