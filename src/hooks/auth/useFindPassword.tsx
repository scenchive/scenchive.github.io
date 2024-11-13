import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useFindPassword = (props: { email: string }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const findPassword = async () => {
    setError(null);
    try {
      const data = { email: props.email };
      const res = await axios.post(
        `${process.env.REACT_APP_API}/member/find/password`,
        data
      );
      alert(res.data);
      navigate('/login');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        alert(err.response.data);
      } else {
        alert('다시 시도해주세요');
      }
    }
  };

  return { findPassword, error };
};

export default useFindPassword;
