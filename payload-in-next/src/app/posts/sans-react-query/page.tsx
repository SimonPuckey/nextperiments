import React from "react";
import PostFeed from "./post-feed";
import { getPosts } from "./actions";
import { ResultStatus } from "@/app/posts/sans-react-query/utils/resultV2";
import { getCachedPagedQuery, getQueryClient } from "./utils/queryClient";

const pageSize = 5;
const Page = async () => {
  // NOTE: alongdside playing with query 'client' mechanism that puts first page in cache
  const queryClient = getQueryClient();
  await queryClient.prefetchPagedQuery({
    queryKey: "getPosts",
    queryFn: async () => await getPosts(1, pageSize),
  });
  const x0 = await getCachedPagedQuery("getPosts");
  console.log("get cached value", x0);
  const result = await getPosts(1, pageSize);
  // NOTE: once pattern matched can access specific type in union type
  if (result.status === ResultStatus.Ok) {
    const {
      data: { posts, hasNextPage },
    } = result;
    return (
      <PostFeed
        initialData={posts}
        pageSize={pageSize}
        hasNextPage={hasNextPage}
      />
    );
  }
  if (result.status === ResultStatus.Error) {
    // TODO: could we just let error throw and handle with an <ErrorBoundary> component? maybe
  }
  // if (result.status === ResultStatus.None) {
  //   // TODO: if no results need a fallback - could <Suspense> be used for this?
  // }
  return <h1>Posts page placeholder textr</h1>;
};

export default Page;
