import useDataFetching from "@/hooks/useDataFetching";
import { Button, Loader } from "@mantine/core";

// Higher-Order Component (HOC)
const withDataFetching = (url) => (WrappedComponent) => {
  const WithDataFetching = (props) => {
    const { data, loading, error, handleRetry } = useDataFetching(url);

    if (loading) {
      return (
        <div className="loading-screen">
          <Loader />
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <p>Error: {error}</p>
          <Button onClick={handleRetry}> Try Again </Button>
        </div>
      );
    }

    return <WrappedComponent data={data} {...props} />;
  };

  return WithDataFetching;
};

export default withDataFetching;
