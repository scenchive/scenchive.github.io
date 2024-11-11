import { useEffect, useState } from 'react';
import { api } from '../api';

interface UseApiReturnType<T> {
  data: T | undefined;
  loading: boolean;
  error: any;
  fetchApi: (
    method: 'get' | 'post' | 'delete' | 'put',
    url: string,
    requestBody?: any,
    header?: any
  ) => Promise<T>;
}

function useApi<T>(): UseApiReturnType<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState(null);

  const fetchApi = async (
    method: string,
    url: string,
    requestBody?: any,
    header?: any
  ) => {
    setLoading(true);

    try {
      let response;
      switch (method.toLowerCase()) {
        case 'get':
          response = await api.get(url, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('my-token')}`,
            },
          });
          setData(response?.data);
          setLoading(false);
          return response.data;
        case 'post':
          response = await api.post(url, requestBody, {
            headers: header
              ? header
              : { Authorization: `Bearer ${localStorage.getItem('my-token')}` },
          });
          setData(response?.data);
          setLoading(false);
          return response.data;
        case 'delete':
          response = await api.delete(url, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('my-token')}`,
            },
          });
          setData(response?.data);
          setLoading(false);
          return response.data;
        case 'put':
          response = await api.put(url, requestBody, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('my-token')}`,
            },
          });
          setData(response?.data);
          setLoading(false);
          return response.data;
        default:
          throw new Error('Unsupported HTTP method');
      }
    } catch (err: any) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };
  return { data, loading, error, fetchApi };
}

export default useApi;
