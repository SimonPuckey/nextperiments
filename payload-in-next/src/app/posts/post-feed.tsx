"use client";
import styled from "styled-components";
import FeedItemCard from "./components/FeedItemCard";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "./useInfiniteScroll";
import { PageQuery, getPostPages } from "./query";

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

const PostFeed = (pageQuery: PageQuery) => {
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery(getPostPages(pageQuery));

  const handleIntersection = useInfiniteScroll({
    isLoading,
    hasNextPage,
    fetchNextPage,
  });

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
