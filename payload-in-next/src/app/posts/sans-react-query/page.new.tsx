// import React from "react";
// import PostFeed from "./post-feed";
// import { getPosts } from "./actions";

// const pageSize = 5;
// const Page = async () => {
//   // NOTE: using result response
//   // TODO: query through mechanism that puts first page in cache, so dont have to pass as props?
//   // TODO: Think should try react-query approach first
//   const queryClient = new QueryClient();
//   await queryClient.prefetchInfiniteQuery({
//     queryKey: ["getPosts"],
//     queryFn: ({ pageParam }) => getPosts(pageParam, pageSize),
//     initialPageParam: 1,
//   });

//   return (
//       <PostFeed pageSize={pageSize} />
//   );
//   // }

//   return <h1>Posts page placeholder textr</h1>;
// };

// export default Page;
