import { PaginatedDocs } from "payload/database";
import { TypeWithID } from "payload/types";
import { z } from "zod";

// TODO: entity schema for id key? then combine with post schema
const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  // beef: z.string(), // for creating and debugging parsing errors as key not on response
});
// zod validates and maps...
const postsPageSchema = z
  .object({
    docs: z.array(postSchema),
    hasNextPage: z.boolean(),
    nextPage: z.union([z.number(), z.null(), z.undefined()]),
  })
  .transform(({ docs, ...rest }) => ({ posts: docs, ...rest }));
type PostsPage = z.infer<typeof postsPageSchema>;

export const toPostsPage = async (
  pagedResponse: PaginatedDocs<TypeWithID & Record<string, unknown>>
): Promise<PostsPage> => {
  // https://github.com/colinhacks/zod#safeparse
  const parseResult = postsPageSchema.safeParse(pagedResponse);
  if (!parseResult.success) {
    console.log("Log Validation error");
    throw new Error("TODO: what error msg required when already logged?");
  }
  const { posts, hasNextPage, nextPage } = parseResult.data;
  return {
    posts,
    hasNextPage,
    nextPage,
  };
};
