import React, { useEffect, useState } from 'react';
import {
  ReviewTop5PerfumeListArea,
  Title,
  EachPerfumeRowArea,
} from './ReviewTop5PerfumeList.styles';
import { useNavigate } from 'react-router-dom';
import PerfumeRow from '../PerfumeRow/PerfumeRow';

interface Perfumes {
  brandImage?: string | null;
  brandName: string;
  brandName_kr?: string;
  perfumeId: number;
  perfumeImage?: string;
  perfumeName: string;
  perfume_kr?: string | null | undefined;
}

const ReviewTop5PerfumeList = (props: {
  reviewTop5PerfumeList: Perfumes[];
}) => {
  const navigate = useNavigate();
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

  return (
    <ReviewTop5PerfumeListArea>
      <Title>최다 리뷰 향수 Top 5</Title>
      {props?.reviewTop5PerfumeList.map((el, index) => (
        <EachPerfumeRowArea index={index}>
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
    </ReviewTop5PerfumeListArea>
  );
};

export default ReviewTop5PerfumeList;
