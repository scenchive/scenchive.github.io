import React, { useEffect, useState } from 'react';
import { DashboardArea } from './styles';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import Color from 'color-thief-react';
import useDashboard from '../../../hooks/dashboard/useDashboard';

import axios from 'axios';
import SeasonBestPerfume from './SeasonBestPerfume/SeasonBestPerfume';

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
  const { getSeasonPopularPerfume } = useDashboard();
  const [seasonPopularList, setSeasonPopularList] = useState<Perfumes[]>([]);

  useEffect(() => {
    const fetchAndCacheData = async () => {
      try {
        const cachedData = sessionStorage.getItem('seasonPopularList');
        // 캐시 데이터가 있을 경우 seasonPopularList 상태 업데이트
        if (cachedData) {
          if (JSON.parse(cachedData).length > 0) {
            setSeasonPopularList(JSON.parse(cachedData));
            return;
          }
        }

        // 캐시 데이터가 없을 경우 api 호출
        const data = await getSeasonPopularPerfume();
        if (data && Array.isArray(data)) {
          sessionStorage.setItem('seasonPopularList', JSON.stringify(data));
          setSeasonPopularList(data);
        }
      } catch (error) {
        console.error('Error fetching season popular perfumes:', error);
      }
    };

    fetchAndCacheData();
  }, []);

  return (
    <DashboardArea>
      {seasonPopularList && seasonPopularList?.length > 0 && (
        <SeasonBestPerfume seasonPopularList={seasonPopularList} />
      )}
    </DashboardArea>
  );
};

export default Dashboard;
