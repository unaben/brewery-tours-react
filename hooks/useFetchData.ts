import { useEffect, useState } from "react";
import type { ApiResponseData, FetchError } from "./useFetchData.types";

const initialApiData: ApiResponseData<never> = {
  isLoading: true,
  data: [],
  error: null,
};

function useFetchData<T>(url: string | null) {
  const [apiData, setApiData] = useState<ApiResponseData<T>>(initialApiData);
  
  const isEmpty = !url || url.trim() === "";  
  
  const result: ApiResponseData<T> = isEmpty
    ? {
        isLoading: false,
        data: [],
        error: {
          message: "Please select a state to view breweries",
          statusCode: null,
        },
      }
    : apiData;

  useEffect(() => {
    if (isEmpty) return;

    let isMounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      setApiData((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const res = await fetch(url, { 
          signal: abortController.signal 
        });

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
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

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
  }, [url, isEmpty]);

  return result;
}

export default useFetchData;
