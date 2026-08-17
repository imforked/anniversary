import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";

export const DiscoverPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <p>Discover page</p>
      <Loader isVisible={isLoading} />
    </>
  );
};
