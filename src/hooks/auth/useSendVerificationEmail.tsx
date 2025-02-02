import axios from 'axios';
import { useState } from 'react';

const useSendVerificationEmail = (props: {
  email: string;
  setIsVerifySent: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [error, setError] = useState<string | null>(null);

  const sendVerificationEmail = async () => {
    setError(null);
    try {
      const data = { email: props.email };
      const res = await axios.post(
        `${process.env.REACT_APP_API}/email/send`,
        data
      );
      alert(res.data);
      props.setIsVerifySent(true);
    } catch (err) {
      alert('다시 시도해주세요');
    }
  };

  return { sendVerificationEmail, error };
};

export default useSendVerificationEmail;
