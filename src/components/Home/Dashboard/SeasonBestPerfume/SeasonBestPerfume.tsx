import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  SeasonBestPerfumeArea,
  SlickSlider,
  Title,
  SliderArea,
  PerfumeRowBox,
  LeftArrow,
  RightArrow,
} from './SeasonBestPerfume.styles';
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

const SeasonBestPerfume = (props: { seasonPopularList: any }) => {
  const navigate = useNavigate();
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
    initialSlide: 0,
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
      <Title>지금 계절, 가장 사랑받는 향수 Top 5</Title>
      <SliderArea>
        {!isMobile && (
          <LeftArrow
            onClick={previous}
            src={'/assets/icon/icon_arrow_left.svg'}
            alt={'pre-arrow'}
          />
        )}
        <SlickSlider {...sliderSettings} ref={slickRef}>
          {props?.seasonPopularList?.map((el: PerfumesInfo, index: number) => (
            <PerfumeRowBox
              key={'perfumeRow_' + index}
              onClick={() => navigate(`/perfumedetail?perfume=${el.perfumeId}`)}
            >
              <PerfumeRow
                addStyle={isMobile ? 'width: inherit !important' : ''}
                isMobile={isMobile}
                index={index}
                perfumeInformation={el}
                ImgWidth={isMobile ? 80 : 90}
                ImgHeight={isMobile ? 80 : 90}
                flexDirection={isMobile ? 'column' : 'row'}
                BrandNameKoreanFontSize={isMobile ? 1.1 : 1.3}
                BrandNameEnglishFontSize={isMobile ? 1.1 : 1.3}
                PerfumeNameFontSize={isMobile ? 1.5 : 1.8}
              />
            </PerfumeRowBox>
          ))}
        </SlickSlider>
        {!isMobile && (
          <RightArrow
            onClick={next}
            src={'/assets/icon/icon_arrow_right.svg'}
            alt={'next-arrow'}
          />
        )}
      </SliderArea>
    </SeasonBestPerfumeArea>
  );
};

export default SeasonBestPerfume;
