import axios from 'axios';
import { useState } from 'react';

const useCheckNameAvailabilityTokenY = () => {
  const [error, setError] = useState<string | null>(null);

  const checkNameAvailabilityTokenY = async (props: { name: string }) => {
    setError(null);
    try {
      const data = { name: props.name };
      const res = await axios.post(`${process.env.REACT_APP_API}/name`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('my-token')}`,
        },
      });
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data);
        return err.response.data;
      }
    }
  };

  return { checkNameAvailabilityTokenY, error };
};

export default useCheckNameAvailabilityTokenY;
