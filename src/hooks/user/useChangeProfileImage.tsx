import axios from 'axios';
import { useState } from 'react';

const useChangeProfileImage = () => {
  const [error, setError] = useState<string | null>(null);

  const changeProfileImage = async (props: { profileImage: any }) => {
    setError(null);

    try {
      const formData = new FormData();
      console.log('?????????????????');
      console.log(props);
      console.log(props.profileImage);
      formData.append('image', props.profileImage);

      const res = await axios.put(
        `${process.env.REACT_APP_API}/profile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
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

  return { changeProfileImage, error };
};

export default useChangeProfileImage;
