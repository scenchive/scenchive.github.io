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
  brandInformation: BrandInfo[];
  ImgWidth: number;
  ImgHeight: number;
  flexDirection: 'column' | 'row';
  BrandNameKoreanFontSize: number;
  BrandNameEnglishFontSize: number;
  BrandNameFontSize: number;
}) => {
  console.log('pppppp', props?.brandInformation[0].name);
  return (
    <BrandRowArea>
      {props?.index && <Ranking index={props?.index} />}
      <BrandImage
        src={
          props?.brandInformation[0]?.brandImage
            ? props?.brandInformation[0]?.brandImage
            : '/assets/image/image_perfume.svg'
        }
        width={props?.ImgWidth}
        height={props?.ImgHeight}
      />
      <BrandInfo>
        <BrandNameArea flexDirection={props?.flexDirection}>
          <BrandNameKorean fontSize={props?.BrandNameKoreanFontSize}>
            {props?.brandInformation[0]?.brandName_kr}
          </BrandNameKorean>

          <BrandNameEnglish fontSize={props?.BrandNameEnglishFontSize}>
            {/* ( {props?.brandInformation[0].name}
            {props?.brandInformation[0]?.name
              ? props?.brandInformation[0]?.name
              : props?.brandInformation[0]?.brandName}
            ) */}{' '}
            {props?.brandInformation[0].name}
          </BrandNameEnglish>
        </BrandNameArea>
        <BrandName fontSize={props?.BrandNameFontSize}>
          {props?.brandInformation[0]?.brandName}
          {props?.brandInformation[0]?.brandName_kr && (
            <span>{props?.brandInformation[0]?.brandName_kr}</span>
          )}
        </BrandName>
      </BrandInfo>
    </BrandRowArea>
  );
};

export default BrandRow;
