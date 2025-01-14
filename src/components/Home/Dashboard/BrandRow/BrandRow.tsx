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
  brandImage: string | null;
  brandName?: string;
  name?: string;
  brandName_kr: string;
}

const BrandRow = (props: {
  index: number | undefined;
  brandInformation: BrandInfo;
  ImgWidth: number;
  ImgHeight: number;
  flexDirection: 'column' | 'row';
  BrandNameKoreanFontSize: number;
  BrandNameEnglishFontSize: number;
  BrandNameFontSize: number;
}) => {
  console.log('pppppp', props?.brandInformation);
  return (
    <BrandRowArea>
      {props?.index && <Ranking index={props?.index} />}
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
          <BrandNameKorean fontSize={props?.BrandNameKoreanFontSize}>
            {props?.brandInformation?.brandName_kr}
          </BrandNameKorean>

          <BrandNameEnglish fontSize={props?.BrandNameEnglishFontSize}>
            {/* ( {props?.brandInformation.name}
            {props?.brandInformation?.name
              ? props?.brandInformation?.name
              : props?.brandInformation?.brandName}
            ) */}{' '}
            {props?.brandInformation.name}
          </BrandNameEnglish>
        </BrandNameArea>
        <BrandName fontSize={props?.BrandNameFontSize}>
          {props?.brandInformation?.brandName}
          {props?.brandInformation?.brandName_kr && (
            <span>{props?.brandInformation?.brandName_kr}</span>
          )}
        </BrandName>
      </BrandInfo>
    </BrandRowArea>
  );
};

export default BrandRow;
