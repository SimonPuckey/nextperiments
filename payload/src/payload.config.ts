import { buildConfig } from "payload/config";
import path from "path";
import Categories from "./collections/Categories";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";
import Media from "./collections/Media";
require("dotenv");

// TODO: look into .env.vault for deploying env to diff environments
// TODO: extract env from process and type env var config object.

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
  },
  collections: [Categories, Posts, Tags, Users, Media],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  // NOTE: should not get from env var anyway as this runs client side when running admin portal
  cors: "*", // because typed string[] | '*' is really hard to get direct from env var - maybe we need to type config first as above
});
