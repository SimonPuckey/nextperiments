import { useRef, useCallback } from "react";
/** IDEA
 * Move useInfiniteQuery and this hook inside a new useInfiniteScroll hook?
 * Because useInfiniteScroll hook is dependent on whatever hook gets paged data (currently react-query useInfiniteQuery)
 * could rename this hook 'useIntersectionObserver'?
 * maybe TDD this to see which approach is best
 */

type InfiniteScrollParams = {
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: Function;
};

export const useInfiniteScroll = ({
  isLoading,
  hasNextPage,
  fetchNextPage,
}: InfiniteScrollParams) => {
  const observer = useRef<IntersectionObserver>();
  // callback ref for DOM element
  // rather than storing a ref to DOM elem will execute function with elem as arg, when elem is rendered
  const handleIntersection = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading) return;
      // if IntersectionObserver already assigned to observer ref then remove assignment
      if (observer.current) observer.current.disconnect();
      // assign intersection observer that fetches next page
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, fetchNextPage]
  );

  return handleIntersection;
};
