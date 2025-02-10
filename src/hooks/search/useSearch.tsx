import axios from 'axios';
import { useState } from 'react';

const useDashboard = () => {
  const [error, setError] = useState<string | null>(null);

  const getSearchNoteList = async (noteSearchWord: string, page: number) => {
    setError(null);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/noteValue?value=${noteSearchWord}&page=${page}`
      );

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data);
        return err.response.data;
      }
    }
  };

  const getSearchByNoteResultList = async (data: FormData, page: number) => {
    setError(null);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/noteperfume?page=${page}`,
        data
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
    getSearchNoteList,
    getSearchByNoteResultList,
  };
};

export default useDashboard;
