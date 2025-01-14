import React, { useEffect, useState } from 'react';
import {
  MostCollectedArea,
  MostCollectedBrandArea,
  Title,
  MostCollectedPerfumeArea,
} from './MostCollected.styles';
import PerfumeRow from '../PerfumeRow/PerfumeRow';
import BrandRow from '../BrandRow/BrandRow';

interface Perfume {
  perfumeId: number;
  name: string;
  brandName: string;
  reviewCount: number;
}
interface Brand {
  brandId: number;
  brandImage: string | null;
  name: string;
  brandName_kr: string;
}

const TopCollected = (props: {
  mostCollectedPerfume: Perfume;
  mostCollectedBrand: Brand;
}) => {
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
  console.log('psop=', props.mostCollectedBrand);
  console.log('??', props.mostCollectedPerfume);
  return (
    <MostCollectedArea>
      <MostCollectedPerfumeArea>
        <Title>센카이버 최다 보유 향수</Title>
        {props.mostCollectedPerfume && (
          <PerfumeRow
            addStyle="margin:0px !important"
            isMobile={isMobile}
            index={undefined}
            perfumeInformation={props?.mostCollectedPerfume}
            ImgWidth={isMobile ? 40 : 50}
            ImgHeight={isMobile ? 40 : 50}
            flexDirection={isMobile ? 'column' : 'row'}
            BrandNameKoreanFontSize={isMobile ? 1 : 1}
            BrandNameEnglishFontSize={isMobile ? 1 : 1}
            PerfumeNameFontSize={isMobile ? 1.3 : 1.3}
          />
        )}
      </MostCollectedPerfumeArea>
      <MostCollectedBrandArea>
        <Title>센카이버 최다 보유 브랜드</Title>

        {props.mostCollectedBrand && (
          <BrandRow
            index={undefined}
            brandInformation={props.mostCollectedBrand}
            ImgWidth={isMobile ? 40 : 50}
            ImgHeight={isMobile ? 40 : 50}
            flexDirection={isMobile ? 'column' : 'row'}
            BrandNameKoreanFontSize={isMobile ? 1 : 1}
            BrandNameEnglishFontSize={isMobile ? 1 : 1}
            BrandNameFontSize={isMobile ? 1.3 : 1.3}
          />
        )}
      </MostCollectedBrandArea>
    </MostCollectedArea>
  );
};

export default TopCollected;
