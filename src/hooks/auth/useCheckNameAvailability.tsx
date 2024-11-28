import axios from 'axios';
import { useState } from 'react';

const useCheckNameAvailability = (props: { name: string }) => {
  const [error, setError] = useState<string | null>(null);

  const checkNameAvailability = async () => {
    setError(null);
    try {
      const data = { name: props.name };
      const res = await axios.post(
        `${process.env.REACT_APP_API}/member/name`,
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

  return { checkNameAvailability, error };
};

export default useCheckNameAvailability;
