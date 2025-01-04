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
    getReviewTop5Perfume,
  } = useDashboard();
  // const [seasonPopularList, setSeasonPopularList] = useState<Perfumes[]>([]);

  const [seasonPopularList, seasonPopularListLoading, seasonPopularListError] =
    useFetchWithCache<Perfumes[]>('seasonPopularList', getSeasonPopularPerfume);

  const [
    reviewTop5PerfumeList,
    reviewTop5PerfumeListLoading,
    reviewTop5PerfumeListError,
  ] = useFetchWithCache('reviewTop5PerfumeList', getReviewTop5Perfume);

  return (
    <DashboardArea>
      {!seasonPopularListLoading &&
        !seasonPopularListError &&
        seasonPopularList &&
        seasonPopularList?.length > 0 && (
          <SeasonBestPerfume seasonPopularList={seasonPopularList} />
        )}

      <Top5 reviewTop5PerfumeList={reviewTop5PerfumeList} />
    </DashboardArea>
  );
};

export default Dashboard;
