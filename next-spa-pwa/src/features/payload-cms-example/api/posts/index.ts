import axios from "axios";
import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl;
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

/* TODO: just PoC can get items from payload collection for now */
export const find = async () => {
  const res = await axios.get<PostsResponse>(apiUrl + entitySlug);
  // TODO: map api response into something better?
  return res?.data;
};
