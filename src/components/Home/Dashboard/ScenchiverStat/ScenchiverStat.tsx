import React, { useEffect, useState } from 'react';
import {
  ScenchiverStatArea,
  Title,
  ScenchiverMasterArea,
  ScenchiverMaster,
  ScenchiverAverageArea,
  ScenchiverAverage,
  ScenchiverAverageNumber,
  ScenchiverMasterRankingIcon,
  ScenchiverMasterName,
} from './ScenchiverStat.style';
import PerfumeRow from '../PerfumeRow/PerfumeRow';
import BrandRow from '../BrandRow/BrandRow';

interface scenchiverMaster {
  name: string;
  count: number;
}
const ScenchiverStat = (props: { scenchiverMasterInfo: scenchiverMaster }) => {
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
    <ScenchiverStatArea>
      <ScenchiverMasterArea>
        <Title>센카이버 향수 마스터</Title>

        <ScenchiverMaster>
          <ScenchiverMasterRankingIcon src="/assets/icon/icon_ranking_first.svg" />
          <ScenchiverMasterName>
            {props.scenchiverMasterInfo.name} {props.scenchiverMasterInfo.count}
            개
          </ScenchiverMasterName>
        </ScenchiverMaster>
      </ScenchiverMasterArea>
      <ScenchiverAverageArea>
        <Title>센카이버 평균 보유 향수</Title>
        <ScenchiverAverage>
          <ScenchiverAverageNumber>
            <span>23</span>개
          </ScenchiverAverageNumber>
        </ScenchiverAverage>
      </ScenchiverAverageArea>
    </ScenchiverStatArea>
  );
};

export default ScenchiverStat;
