import path from "path";
import { buildConfig } from "payload/config";
import Categories from "./collections/Categories";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";

// TODO: got users as default but override with own Users as per standalone app?
// TODO: not adding express or gql right now as want to try local api
export default buildConfig({
  // admin: {
  //   user: Users.slug,
  // },
  // collections: [Categories, Posts, Tags, Media],
  // excluding media as could mean 'sharp' is included
  // which is a problem because then cannot find it remotely
  // even though vercel claims to install it by default...
  // https://github.com/payloadcms/next-payload/issues/72#issuecomment-1743760245
  collections: [Categories, Posts, Tags],
  globals: [
    // Your globals here
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "../payload-types.ts"),
  },
});
