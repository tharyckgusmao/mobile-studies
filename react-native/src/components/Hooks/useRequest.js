import React, {useState, useEffect, useCallback} from 'react';

export const useRequest = (
  config = {
    error: true,
    errorMessage: '',
    success: false,
    successMessage: '',
  },
  service = null,
) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isError, setIsError] = useState(false);
  const [serviceObserver, setService] = useState(service);

  const fetchData = useCallback(
    async (r = null, callback = null, options = null) => {
      setIsError(false);
      setIsFetched(false);
      setIsLoading(true);
      let result = null;
      try {
        if (!r) {
          result = await serviceObserver();
        } else {
          result = await r();
        }
        if (callback) {
          callback(null, result.data);
        }
        setData(result.data || null);
        if ((options && options.success) || config.success) {
        }
      } catch (error) {
        setIsError(true);

        if (config.error) {
        }
        if (callback) {
          callback(error, null);
        }
      }

      setIsLoading(false);
      setIsFetched(true);
      if (!callback) {
        return result;
      }
    },
  );

  useEffect(() => {
    if (serviceObserver) {
      fetchData();
    }
  }, [fetchData, serviceObserver]);

  const request = (r, callback, options = null) =>
    fetchData(() => r, callback, options);

  return [
    {
      data,
      isLoading,
      isFetched,
      isError,
    },
    request,
    setService,
  ];
};

export default useRequest;
