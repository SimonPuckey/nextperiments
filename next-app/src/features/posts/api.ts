import axios from "axios";

const apiUrl =
  process.env.SERVER_SIDE_API_URL || process.env.NEXT_PUBLIC_API_URL;
const entitySlug = "posts";

type Entity = {
  id: string;
};
type Post = Entity & {
  title: string;
};
type PostsResponse = {
  docs: Post[];
};

export const find = async () => {
  const res = await axios.get<PostsResponse>(apiUrl + entitySlug);
  return res?.data;
};
