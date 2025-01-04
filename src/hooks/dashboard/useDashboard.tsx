import axios from 'axios';
import { useState } from 'react';

const useDashboard = () => {
  const [error, setError] = useState<string | null>(null);

  const getSeasonPopularPerfume = async () => {
    setError(null);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/main/popular-season`
      );
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data);
        return err.response.data;
      }
    }
  };

  const getMostCollectedPerfume = async () => {
    setError(null);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/main/most-collected/perfume`
      );
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data);
        return err.response.data;
      }
    }
  };
  const getMostCollectedBrand = async () => {
    setError(null);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/main/most-collected/brand`
      );
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data);
        return err.response.data;
      }
    }
  };

  const getReviewTop5Perfume = async () => {
    setError(null);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/main/top-reviewed-perfumes`
      );
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data);
        return err.response.data;
      }
    }
  };

  return {
    getSeasonPopularPerfume,
    getMostCollectedPerfume,
    getMostCollectedBrand,
    getReviewTop5Perfume,
  };
};

export default useDashboard;
