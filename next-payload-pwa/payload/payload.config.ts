import path from "path";
import { buildConfig } from "payload/config";
import Categories from "./collections/Categories";
import Media from "./collections/Media";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";

// TODO: got users as default but override with own Users as per standalone app?
// TODO: not adding express or gql right now as want to try local api
export default buildConfig({
  // admin: {
  //   user: Users.slug,
  // },
  collections: [Categories, Posts, Tags, Media],
  globals: [
    // Your globals here
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "../payload-types.ts"),
  },
});
