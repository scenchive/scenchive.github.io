import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  SeasonBestPerfumeArea,
  SlickSlider,
  Title,
  SliderArea,
  PerfumeRowBox,
  LeftArrow,
  RightArrow,
} from './ScenchiverMostCollected.styles';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../api';
import Color from 'color-thief-react';

import axios from 'axios';
import PerfumeRow from '../PerfumeRow/PerfumeRow';

interface PerfumesInfo {
  brandId: number;
  brandImage: string | null;
  brandName: string;
  brandName_kr: string;
  perfumeId: number;
  perfumeImage: string;
  perfumeName: string;
  perfume_kr: string | null | undefined;
}

const ScenchiverMostCollected = (props: { seasonPopularList: any }) => {
  const slickRef = useRef<any>(null); // Slider의 정확한 타입으로 설정
  const previous = useCallback(() => {
    if (slickRef.current) {
      slickRef.current.slickPrev();
    }
  }, []);

  const next = useCallback(() => {
    if (slickRef.current) {
      slickRef.current.slickNext();
    }
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const breakpoint = 565;
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // 초기값 설정 및 이벤트 리스너 등록
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sliderSettings = {
    dots: isMobile ? true : false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 3000,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 565,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <SeasonBestPerfumeArea>
      <Title>센카이버 최다 보유 향수</Title>

      <Title>센카이버 최다 보유 브랜드</Title>
    </SeasonBestPerfumeArea>
  );
};

export default ScenchiverMostCollected;
