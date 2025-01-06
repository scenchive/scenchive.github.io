import axios from 'axios';
import { useState } from 'react';

const useFetchMyCollection = () => {
  const [error, setError] = useState<string | null>(null);

  const getMyCollection = async () => {
    setError(null);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/user/perfume-collect`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('my-token')}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data);
        return err.response.data;
      }
    }
  };

  const postMyCollection = async (perfumeId: number) => {
    setError(null);
    const data = { perfumeId: perfumeId };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/perfume-collect`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('my-token')}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data);
        return err.response.data;
      }
    }
  };

  const deleteMyCollection = async (perfumeId: number) => {
    setError(null);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/user/perfume-collect/` + perfumeId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('my-token')}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data);
        return err.response.data;
      }
    }
  };

  return { getMyCollection, postMyCollection, deleteMyCollection, error };
};

export default useFetchMyCollection;
