import { useEffect, useState, useCallback } from "react";

const useFetchWithCredentials = (url, cacheKey) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cache = useFetchWithCredentials.cache || {};
  useFetchWithCredentials.cache = cache;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (cache[cacheKey]) {
      setData(cache[cacheKey]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      cache[cacheKey] = json;
      setData(json);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [url, cacheKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    cache[cacheKey] = null;
    fetchData();
  };

  const clearCache = () => {
    cache[cacheKey] = null;
  };

  return { data, loading, error, refetch, clearCache };
};

export default useFetchWithCredentials;
