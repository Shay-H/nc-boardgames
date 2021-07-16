import { useEffect } from "react";
import { useState } from "react";

export const useRequestData = (requestFunc, returnedDataKey, ...funcArgs) => {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [doesNotExist, setDoesNotExist] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    requestFunc(...funcArgs)
      .then(({ data }) => {
        setData(data[returnedDataKey]);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [returnedDataKey, requestFunc, funcArgs]);

  return { data, isLoaded };
};
