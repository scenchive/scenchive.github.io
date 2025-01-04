import React from 'react';
import { useState, useEffect } from 'react';

export const useFetchWithCache = <T,>(
  key: string,
  fetcher: () => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    sessionStorage.removeItem('reviewTop5PerfumeList');

    const fetchData = async () => {
      try {
        const cachedData = sessionStorage.getItem(key);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData) as T;

          setData(parsedData);
          setLoading(false);
          return;
        }
        const fetchedData = await fetcher();
        sessionStorage.setItem(key, JSON.stringify(fetchedData));
        setData(fetchedData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key]);

  return [data, loading, error] as const;
};
