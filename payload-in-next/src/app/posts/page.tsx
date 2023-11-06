import React from "react";
import PostFeed from "./post-feed";
import { fetchPayloadPosts } from "./actions";
import { ResultStatus } from "@/utils/resultV2";

// TODO: typing for payload response
// TODO: typing for posts collection ion docs array
// type PayloadRespoonse = {
//     docs:
// }

const pageSize = 5;
const Page = async () => {
  /*
  // just get first 10 from server for now to test working
  const { posts, hasNextPage } = await fetchPayloadPosts(1, pageSize);
  // console.log("posts response keys", Object.keys(posts));
  // TODO: currently no error response that get from react query or error handling
  // TODO: use suspense
  if (posts) {
    return (
      <PostFeed
        initialData={posts}
        pageSize={pageSize}
        hasNextPage={hasNextPage}
      />
    );
  }
  */
  // NOTE: using result response
  const result = await fetchPayloadPosts(1, pageSize);
  // NOTE: once pattern matched can access specific type in union type
  if (result.status === ResultStatus.Ok) {
    const {
      value: { posts, hasNextPage },
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
    // could we just let error throw and handle with an error boundary component? maybe
  }
  if (result.status === ResultStatus.None) {
  }
  return <h1>Posts page placeholder textr</h1>;
};

export default Page;
