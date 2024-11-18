import axios from 'axios';
import { useState } from 'react';

const useCheckEmailAvailability = (props: { email: string }) => {
  const [error, setError] = useState<string | null>(null);

  const checkEmailAvailability = async () => {
    setError(null);
    try {
      const data = { email: props.email };
      const res = await axios.post(
        `${process.env.REACT_APP_API}/member/email`,
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

  return { checkEmailAvailability, error };
};

export default useCheckEmailAvailability;
