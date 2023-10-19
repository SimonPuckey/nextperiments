import React from "react";
import PostFeed from "./post-feed";
import { fetchPayloadPosts } from "./actions";

// TODO: typing for payload response
// TODO: typing for posts collection ion docs array
// type PayloadRespoonse = {
//     docs:
// }

const Page = async () => {
  // just get first 10 from server for now to test working
  // todo need to convert to array
  const { posts } = await fetchPayloadPosts(1, 5);
  // console.log("posts response keys", Object.keys(posts));
  const { docs } = posts;
  // currently no error response that get from react query or error handling
  if (docs) {
    return <PostFeed initialData={docs} />;
  }
  return <h1>Posts page placeholder textr</h1>;
};

export default Page;
