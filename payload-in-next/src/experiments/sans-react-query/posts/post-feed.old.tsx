"use client";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import FeedItemCard from "../../../app/posts/components/FeedItemCard";
import { getPosts } from "./actions";
import { ResultStatus } from "@/experiments/sans-react-query/utils/resultV2";

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
  initialData: Post[];
  pageSize: number;
  hasNextPage: boolean;
};

// TODO
/*
- extract all data fetching hooks into own hook - useServerQuery 
- then replace with React Query but call payload.find directly
- trying to solve: is it easier to use RQ with server actions or just server actions with custom logic?
- also extract intersection observer shiz into own hook
*/

const PostFeed = ({ initialData, pageSize, hasNextPage }: PostsProps) => {
  const [posts, setPosts] = useState(initialData);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(hasNextPage);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    console.log("in load more with page", page);
    const nextPage = page + 1;
    console.log("in load more with nextpage", nextPage);
    // const { posts, hasNextPage } = await fetchPayloadPosts(nextPage, pageSize);

    // TODO: set timeout to prove isLoading works

    setTimeout(async () => {
      const result = await getPosts(nextPage, pageSize);
      // TODO: nested if not so cool. Maybe Result type not best approach - try error boundary and suspense
      if (result.status === ResultStatus.Ok) {
        const {
          data: { posts, hasNextPage },
        } = result;
        if (posts?.length) {
          setHasMorePages(hasNextPage);
          setPage(nextPage);
          console.log("after set page with next page", nextPage);
          setIsLoading(false);
          setPosts((prev) => [...prev, ...posts]);
        }
      }
      console.log("delayed for 5 secs");
    }, 5000);
    // const result = await fetchPayloadPosts(nextPage, pageSize);

    // pass fn to use state to compute new state by merging prev and new state
  }, [page, pageSize]);

  const observer = useRef<IntersectionObserver>();

  // callback ref for DOM element
  // rather than storing a ref to DOM elem will execute function with elem as arg, when elem is rendered
  const handleIntersection = useCallback(
    (node: HTMLLIElement) => {
      // if data loading then bail...
      // TODO: replace react-query functionality?
      if (isLoading) return;
      // if IntersectionObserver already assigned to observer ref then remove assignment
      if (observer.current) observer.current.disconnect();
      // assign intersection observer that fetches next page
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorePages) {
          loadMore();
        }
        // TODO: replace react-query functionality?
        // if (entries[0].isIntersecting && hasNextPage && !isFetching) {npm run build
        //   fetchNextPage();
        // }
      });
      if (node) observer.current.observe(node);
    },
    // [isLoading, hasNextPage, isFetching, fetchNextPage]
    [isLoading, hasMorePages, loadMore] // TODO: should i have load more in here but causes error
  );

  return (
    <section>
      <HeadingLg>Posts</HeadingLg>
      <StyledList>
        {posts.map(({ title }, i) => {
          return (
            <StyledListItem
              key={title}
              ref={posts.length - 1 === i ? handleIntersection : null}
            >
              <FeedItemCard title={title} />
            </StyledListItem>
          );
        })}
      </StyledList>
      {isLoading && <p>Loading...</p>}
    </section>
  );
};

export default PostFeed;
