"use client";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import FeedItemCard from "../components/FeedItemCard";
import { getPosts } from "./actions";
import { usePagedQuery } from "./usePagedQuery";

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
- example here - https://tanstack.com/query/v5/docs/react/guides/advanced-ssr
- trying to solve: is it easier to use RQ with server actions or just server actions with custom logic?
- also extract intersection observer shiz into own hook
*/

// TODO: setup initial data and initial page with a query client fn
const PostFeed = ({ initialData, pageSize }: PostsProps) => {
  const { isLoading, data, fetchNextPage, hasNextPage } = usePagedQuery(
    (page: any) => getPosts(page, pageSize),
    initialData
  );

  // TODO: Can I put IntersectionObserver logic into own hook
  // would need to pass in what usePagedQueryReturns
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
        <HeadingLg>Posts Feed V2</HeadingLg>
        <StyledList>
          {data.map(({ title }, i) => {
            return (
              <StyledListItem
                key={title}
                ref={data.length - 1 === i ? handleIntersection : null}
              >
                <FeedItemCard title={title} />
              </StyledListItem>
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
