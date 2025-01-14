import React, { useEffect, useRef, useState } from 'react';
import {
  Top5BrandListArea,
  Title,
  SlickSlider,
  PerfumeRowBox,
  EachPerfumeRowArea,
  SliderArea,
} from './Top5BrandList.styles';

import { useNavigate } from 'react-router-dom';
import PerfumeRow from '../PerfumeRow/PerfumeRow';
import BrandRow from '../BrandRow/BrandRow';

interface Perfumes {
  brandImage?: string | null;
  brandName: string;
  brandName_kr?: string;
  perfumeId: number;
  perfumeImage?: string;
  perfumeName: string;
  perfume_kr?: string | null | undefined;
}

const Top5BrandList = (props: { reviewTop5PerfumeList: Perfumes[] }) => {
  const navigate = useNavigate();
  const slickRef = useRef<any>(null); // Slider의 정확한 타입으로 설정
  const [isMobile, setIsMobile] = useState(false);

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
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

  return (
    <Top5BrandListArea>
      <Title>인기 브랜드 Top 5</Title>
      {/* {isMobile ? (
        <SlickSlider {...sliderSettings} ref={slickRef}>
          {props?.reviewTop5PerfumeList?.map((el, index) => (
            <SliderArea>
              <PerfumeRowBox key={'perfumeRow_' + index}>
                <BrandRow
                  isMobile={isMobile}
                  index={index}
                  perfumeInformation={el}
                  ImgWidth={60}
                  ImgHeight={60}
                  flexDirection={isMobile ? 'column' : 'row'}
                  BrandNameKoreanFontSize={1.1}
                  BrandNameEnglishFontSize={1.1}
                  PerfumeNameFontSize={1.5}
                />
              </PerfumeRowBox>
            </SliderArea>
          ))}
        </SlickSlider>
      ) : (
        <>
          {props?.reviewTop5PerfumeList.map((el, index) => (
            <EachPerfumeRowArea index={index} key={'reviewTop' + index}>
              <PerfumeRow
                addStyle="margin:0px !important"
                key={'top5Perfume_' + index}
                isMobile={isMobile}
                index={index}
                perfumeInformation={el}
                ImgWidth={isMobile ? 40 : 50}
                ImgHeight={isMobile ? 40 : 50}
                flexDirection={isMobile ? 'column' : 'row'}
                BrandNameKoreanFontSize={isMobile ? 1 : 1}
                BrandNameEnglishFontSize={isMobile ? 1 : 1}
                PerfumeNameFontSize={isMobile ? 1.3 : 1.3}
              />
            </EachPerfumeRowArea>
          ))}
        </>
      )} */}
    </Top5BrandListArea>
  );
};

export default Top5BrandList;
