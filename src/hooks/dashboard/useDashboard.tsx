import axios from 'axios';
import { useState } from 'react';

const useDashboard = () => {
  const [error, setError] = useState<string | null>(null);

  const getSeasonPopularPerfume = async () => {
    setError(null);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/main/popular-season`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('my-token')}`,
          },
        }
      );
      console.log('------------------');
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data);
        return err.response.data;
      }
    }
  };

  return { getSeasonPopularPerfume, error };
};

export default useDashboard;
