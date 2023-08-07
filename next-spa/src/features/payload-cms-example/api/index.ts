import axios from "axios";

const baseUrl = "http://localhost:3001/api/";

type Entity = {
  id: string;
};
type Post = Entity & {
  title: string;
};
type PostsResponse = {
  docs: Post[];
};

/* TODO: just PoC can get items from payload collection for now */
export const find = async (slug: string) => {
  console.log("base url", baseUrl);
  const res = await axios.get<PostsResponse>(baseUrl + slug);
  console.log("payload res", res.data);
  // TODO: map api response into something better
  return res?.data;
};
