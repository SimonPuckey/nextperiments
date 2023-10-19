"use server";
import getPayloadClient from "../../../payload/payloadClient";

// TODO: add some typing
// type Entity = {
//   id: string;
// };
// type Post = Entity & {
//   title: string;
// };
// type PostsResponse = {
//   docs: Post[];
// };

// TODO what paging params can we pass to payload client
export const fetchPayloadPosts = async (page: number, pageSize: number) => {
  const payload = await getPayloadClient();
  // https://payloadcms.com/docs/local-api/overview#find
  const posts = await payload.find({
    collection: "posts",
    page: page,
    limit: pageSize,
    sort: "createdAt",
  });

  // console.log(posts.docs[0]);

  return { posts };
};
