import axios from 'axios';
import { useState } from 'react';

const useCheckVerificationEmail = (props: {
  email: string;
  verificationCode: string;
  setIsEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [error, setError] = useState<string | null>(null);

  const checkVerificationEmail = async () => {
    setError(null);
    try {
      const data = { email: props.email, code: props.verificationCode };
      const res = await axios.post(
        `${process.env.REACT_APP_API}/email/verify`,
        data
      );
      alert(res.data);
      props.setIsEmailVerified(true);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        alert(err.response.data);
      } else {
        alert('다시 시도해주세요');
      }
    }
  };

  return { checkVerificationEmail, error };
};

export default useCheckVerificationEmail;
