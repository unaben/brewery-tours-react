import { useEffect, useState } from "react";
import type { ApiResponseData, FetchError } from "./useFetchData.types";

const initialApiData: ApiResponseData<never> = {
  isLoading: true,
  data: [],
  error: null,
};

function useFetchData<T>(url: string) {
  const [apiData, setApiData] = useState<ApiResponseData<T>>(initialApiData);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      setApiData((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const res = await fetch(url);

        if (!res.ok) {
          const structuredError: FetchError = {
            message: `Failed to fetch data. Status: ${res.status}`,
            statusCode: res.status,
          };

          if (isMounted) {
            setApiData((prev) => ({
              ...prev,
              error: structuredError,
              isLoading: false,
            }));
          }
          return;
        }

        const resData = await res.json();

        if (isMounted) {
          setApiData({
            data: resData,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        const structuredError: FetchError = {
          message:
            error instanceof Error ? error.message : "Unknown error occurred",
          statusCode: null,
        };

        if (isMounted) {
          setApiData((prev) => ({
            ...prev,
            isLoading: false,
            error: structuredError,
          }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    abortController.abort();
    };
  }, [url]);

  return apiData;
}

export default useFetchData;
