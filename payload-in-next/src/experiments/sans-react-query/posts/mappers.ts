import { PaginatedDocs } from "payload/database";
import { TypeWithID } from "payload/types";
import { z } from "zod";
// TODO: add some typing
// Payload now has similar strong typing need to map with
// type Entity = {
//   id: string;
// };
// type Post = Entity & {
//   title: string;
// };
// type PostsResponse = {
//   docs: Post[];
// };
// TODO: do we need to zod this?
type PostsResponse = {
  posts: Post[];
  hasNextPage: boolean;
};

// Zod
const postSchema = z.object({
  id: z.string(), // TODO: should id be part of entity type as planned?
  title: z.string(),
});
type Post = z.infer<typeof postSchema>;

const toPost = (
  doc: TypeWithID & Record<string, unknown>
): Post | undefined => {
  try {
    const validPost = postSchema.parse(doc);
    const { id, title } = validPost;
    return { id, title };
  } catch (err) {
    // TODO: better logging so know which item failed
    if (err instanceof z.ZodError) {
      console.log(err.issues);
    }
  }

  //TODO use safe parse
  // avoid try/catch but will need to use result types e2e
  // const parsed = postSchema.safeParse(doc);
  // if(parsed.success){
  //   parsed.data
  // }
};
// Todo: make generic?
export const toPostsResponse = (
  pagedResponse: PaginatedDocs<TypeWithID & Record<string, unknown>>
): PostsResponse => {
  const { docs, hasNextPage } = pagedResponse;
  // TODO: more efficient to use a reducer than double loop of map>filter?
  const posts = docs
    .map(toPost)
    // IMPORTANT: have to use type guard so TS knows we have filtered any item that isnt a Post (ie undefined)
    // https://www.benmvp.com/blog/filtering-undefined-elements-from-array-typescript/
    .filter((item): item is Post => !!item);
  return {
    posts,
    hasNextPage,
  };
};
