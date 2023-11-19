"use client";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import FeedItemCard from "./components/FeedItemCard";
import { getPosts } from "./actions";
import { useInfiniteQuery } from "@tanstack/react-query";

const HeadingLg = styled.h2`
  font-size: 1.5rem;
  line-height: 1.4;
  margin: 1rem 0;
`;
const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const StyledListItem = styled.li`
  margin: 0 0 1.25rem;
`;

type Post = {
  // id: number | string,
  title: string;
};
type PostsProps = {
  pageSize: number;
};

/* TODO
- think of better way to set initialPageParam as a little janky
- also extract intersection observer shiz into own hook
*/

const PostFeed = ({ pageSize }: PostsProps) => {
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["getPosts"],
    queryFn: ({ pageParam }) => getPosts(pageParam, pageSize),
    // HC'ing starting page seems bit rubbish when prefetching and controlling pagesize 🤨
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // this function determines the pageParam that gets passed to the query fn
      // https://tanstack.com/query/v5/docs/react/guides/infinite-queries
      return lastPage.hasNextPage ? lastPage.nextPage : undefined;
    },
    // below may be useful to leave as 'true' but confusing when confirming server-side rendering
    // refetchOnWindowFocus: false,
    // below throws to nearest ErrorBoundary, rather than using isError
    // https://tkdodo.eu/blog/react-query-error-handling#error-boundaries
    throwOnError: true,
  });

  // TODO: Can I put IntersectionObserver logic into own hook
  // Would have to pass in some of what useInfiniteQuery returns
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
    [isLoading, fetchNextPage, hasNextPage]
  );

  if (data) {
    return (
      <section>
        <HeadingLg>Posts Feed V3</HeadingLg>
        <StyledList>
          {data?.pages?.map((page, i) => {
            return (
              <div key={i}>
                {page.posts.map(({ title }, i) => {
                  return (
                    <StyledListItem
                      key={title}
                      ref={
                        page.posts.length - 1 === i ? handleIntersection : null
                      }
                    >
                      <FeedItemCard title={title} />
                    </StyledListItem>
                  );
                })}
              </div>
            );
          })}
        </StyledList>
        {isLoading && <p>Loading...</p>}
      </section>
    );
  }

  return <></>;
};

export default PostFeed;
