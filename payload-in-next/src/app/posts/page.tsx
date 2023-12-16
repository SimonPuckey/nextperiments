import React from "react";
import PostFeed from "./post-feed";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getPostPages } from "./query";

const pageSize = 5;
const initialPage = 1;
const Page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    getPostPages({ pageSize, initialPage })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostFeed pageSize={pageSize} initialPage={initialPage} />
    </HydrationBoundary>
  );
};

export default Page;
