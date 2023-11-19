import { useCallback, useState } from "react";
import { ResultStatus } from "@/app/posts/sans-react-query/utils/resultV2";
import { getCachedPagedQuery, getQueryClient } from "./utils/queryClient";

// TODO: experimenting with server actions version of useInfiniteQuery. sort of
// TODO: Params: queryFn, ...
// TODO: react query controls all data retrieved internally
export const usePagedQuery = (queryFn: Function, firstPage: any[]) => {
  // need better type declaration for query fn
  // NOTE: using this hook for paginated queries in client components, we can assume the server has already got the first page
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(firstPage); // TODO: can type this generically?
  const [hasNextPage, setHasNextPage] = useState(true); // assume if called there is a next page

  // todo: do we need 'useCallback' if inside custom hook?
  const fetchNextPage = useCallback(async () => {
    const queryClient = getQueryClient();
    // const cacheResult = await queryClient.getCachedPagedQuery("getPosts");
    const cacheResult = await getCachedPagedQuery("getPosts");
    console.log("in fetch next page - result of get cache", cacheResult);
    setIsLoading(true);
    console.log("in fetch next page with page number", currentPage);
    const nextPage = currentPage + 1; //page number needs to be incremented before we call
    console.log("in load more with nextpage", nextPage);
    // const { posts, hasNextPage } = await fetchPayloadPosts(nextPage, pageSize);

    // TODO: set timeout to prove isLoading works
    // const result = await fetchPayloadPosts(nextPage, pageSize);
    const result = await queryFn(nextPage); //
    if (result.status === ResultStatus.Ok) {
      // const {
      //   value: { posts, hasNextPage },
      // } = result;
      const resultData: never[] = result?.value?.posts; // todo result of server action needs generic type not nominal e.g. data
      setHasNextPage(result?.value?.hasNextPage);
      if (resultData?.length) {
        // setHasMorePages(hasNextPage); // TODO: can just return hasNextPage from USQ?
        setCurrentPage(nextPage); // TODO: required to work out next page, RQ accepts fn param that does this - needs some thought
        console.log("after set page with next page", nextPage);
        setIsLoading(false);
        // TODO: set data in component that calls USQ?
        setData((prev) => [...prev, ...resultData]);
      }
    }
    // const result = await fetchPayloadPosts(nextPage, pageSize);

    // pass fn to use state to compute new state by merging prev and new state
  }, [currentPage, queryFn]);

  return { isLoading, data, fetchNextPage, hasNextPage };
};
