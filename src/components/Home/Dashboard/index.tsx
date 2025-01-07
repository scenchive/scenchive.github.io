import React, { useEffect, useState } from 'react';
import { DashboardArea } from './styles';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import Color from 'color-thief-react';
import useDashboard from '../../../hooks/dashboard/useDashboard';

import axios from 'axios';
import SeasonBestPerfume from './SeasonBestPerfume/SeasonBestPerfume';
import Top5 from './Top5/Top5';
import { useFetchWithCache } from '../../../hooks/dashboard/useFetchWithCache';
import MostCollected from './MostCollected/MostCollected';
import ScenchiverStat from './ScenchiverStat/ScenchiverStat';

interface Perfumes {
  perfumeId: number;
  perfumeName: string;
  perfume_kr: string | null;
  perfumeImage: string;
  brandId: number;
  brandName: string;
  brandName_kr: string;
  brandImage: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('my-token');
  const {
    getSeasonPopularPerfume,
    getMostCollectedPerfume,
    getMostCollectedBrand,
    getScenchiverMaster,
    getReviewTop5Perfume,
  } = useDashboard();

  const [seasonPopularList, seasonPopularListLoading, seasonPopularListError] =
    useFetchWithCache<Perfumes[]>('seasonPopularList', getSeasonPopularPerfume);

  const [mostCollectedPerfume] = useFetchWithCache(
    'mostCollectedPerfume',
    getMostCollectedPerfume
  );
  const [mostCollectedBrand] = useFetchWithCache(
    'mostCollectedBrand',
    getMostCollectedBrand
  );
  const [scenchiverMasterInfo] = useFetchWithCache(
    'scenchiverMasterInfo',
    getScenchiverMaster
  );

  const [reviewTop5PerfumeList] = useFetchWithCache(
    'reviewTop5PerfumeList',
    getReviewTop5Perfume
  );

  return (
    <DashboardArea>
      {!seasonPopularListLoading &&
        !seasonPopularListError &&
        seasonPopularList &&
        seasonPopularList?.length > 0 && (
          <SeasonBestPerfume seasonPopularList={seasonPopularList} />
        )}

      <div style={{ fontSize: '30px', color: 'red', fontWeight: 600 }}>
        {' '}
        가장 많이 보유항 향수랑 브랜드 넣어야 함
      </div>
      {/* <MostCollected
        mostCollectedPerfume={mostCollectedPerfume}
        mostCollectedBrand={mostCollectedBrand}
      /> */}
      {scenchiverMasterInfo && (
        <ScenchiverStat scenchiverMasterInfo={scenchiverMasterInfo[0]} />
      )}
      {reviewTop5PerfumeList && (
        <Top5 reviewTop5PerfumeList={reviewTop5PerfumeList} />
      )}
    </DashboardArea>
  );
};

export default Dashboard;
