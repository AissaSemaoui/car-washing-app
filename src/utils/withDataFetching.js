import useDataFetching from "@/hooks/useDataFetching";
import { Button } from "@mantine/core";

// Higher-Order Component (HOC)
const withDataFetching = (url) => (WrappedComponent) => {
  const WithDataFetching = (props) => {
    const { data, loading, error, handleRetry } = useDataFetching(url);

    if (loading) {
      return <p>Loading...</p>;
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
