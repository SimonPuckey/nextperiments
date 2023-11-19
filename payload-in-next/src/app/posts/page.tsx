import React from "react";
import PostFeed from "./post-feed";
import { getPosts } from "./actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const pageSize = 5;
const Page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["getPosts"],
    queryFn: ({ pageParam }) => getPosts(pageParam, pageSize),
    initialPageParam: 1,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostFeed pageSize={pageSize} />
    </HydrationBoundary>
  );
};

export default Page;
