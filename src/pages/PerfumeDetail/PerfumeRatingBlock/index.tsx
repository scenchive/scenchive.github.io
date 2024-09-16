import React, { useEffect, useRef, useState } from 'react';
import {
  SeasonRatingArea,
  SeasonCell,
  SeasonIcon,
  SeasonRating,
  StatusBarArea,
  StatusBar,
  OtherRatingArea,
} from './styles';
import { PerfumeRatingGroup } from '../../../common/types';

const PerfumeRatingBlock = (props: {
  perfumeRating: PerfumeRatingGroup | undefined;
}) => {
  return (
    <>
      <SeasonRatingArea>
        <SeasonCell>
          <SeasonIcon src="/assets/icon/icon_spring.svg" />
          <SeasonRating>
            봄 {props?.perfumeRating?.seasonAvg?.spring}%
          </SeasonRating>
          <StatusBarArea>
            <StatusBar
              backgroundColor={'#A2ED57'}
              statusWidth={
                props?.perfumeRating?.seasonAvg?.spring
                  ? props?.perfumeRating?.seasonAvg?.spring
                  : 0
              }
            />
          </StatusBarArea>
        </SeasonCell>
        <SeasonCell>
          <SeasonIcon src="/assets/icon/icon_summer.svg" />
          <SeasonRating>
            여름 {props?.perfumeRating?.seasonAvg?.summer}%
          </SeasonRating>
          <StatusBarArea>
            <StatusBar
              backgroundColor={'#EB5946'}
              statusWidth={
                props?.perfumeRating?.seasonAvg?.summer
                  ? props?.perfumeRating?.seasonAvg?.summer
                  : 0
              }
            />
          </StatusBarArea>
        </SeasonCell>
        <SeasonCell>
          <SeasonIcon src="/assets/icon/icon_fall.svg" />
          <SeasonRating>
            가을 {props?.perfumeRating?.seasonAvg?.fall}%
          </SeasonRating>
          <StatusBarArea>
            <StatusBar
              backgroundColor={'#E58513'}
              statusWidth={
                props?.perfumeRating?.seasonAvg?.fall
                  ? props?.perfumeRating?.seasonAvg?.fall
                  : 0
              }
            />
          </StatusBarArea>
        </SeasonCell>
        <SeasonCell>
          <SeasonIcon src="/assets/icon/icon_winter.svg" />
          <SeasonRating>
            겨울 {props?.perfumeRating?.seasonAvg?.winter}%
          </SeasonRating>
          <StatusBarArea>
            <StatusBar
              backgroundColor={'#0ACAE4'}
              statusWidth={
                props?.perfumeRating?.seasonAvg?.winter
                  ? props?.perfumeRating?.seasonAvg?.winter
                  : 0
              }
            />
          </StatusBarArea>
        </SeasonCell>
      </SeasonRatingArea>

      <OtherRatingArea>
        <SeasonCell>
          <SeasonIcon src="/assets/icon/icon_longevity.svg" />
          <SeasonRating>
            지속력{props?.perfumeRating?.longevityAvg}%
          </SeasonRating>
          <StatusBarArea>
            <StatusBar
              backgroundColor={'#DFA338'}
              statusWidth={
                props?.perfumeRating?.longevityAvg
                  ? props?.perfumeRating?.longevityAvg
                  : 0
              }
            />
          </StatusBarArea>
        </SeasonCell>
        <SeasonCell>
          <SeasonIcon src="/assets/icon/icon_sillage.svg" />
          <SeasonRating>
            확산력 {props?.perfumeRating?.sillageAvg}%
          </SeasonRating>
          <StatusBarArea>
            <StatusBar
              backgroundColor={'#4C4538'}
              statusWidth={
                props?.perfumeRating?.sillageAvg
                  ? props?.perfumeRating?.sillageAvg
                  : 0
              }
            />
          </StatusBarArea>
        </SeasonCell>
      </OtherRatingArea>
    </>
  );
};

export default PerfumeRatingBlock;
