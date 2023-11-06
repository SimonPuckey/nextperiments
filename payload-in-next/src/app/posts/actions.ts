"use server";
import { TypeWithID } from "payload/types";
import getPayloadClient from "../../../payload/payloadClient";
import { PaginatedDocs } from "payload/database";
import { toPostsResponse } from "./mappers";
import { Result } from "@/utils/resultV2";

// TODO what paging params can we pass to payload client
export const fetchPayloadPosts = async (page: number, pageSize: number) => {
  const payload = await getPayloadClient();
  // https://payloadcms.com/docs/local-api/overview#find
  // TODO: return error - need try /catch?
  // TODO: return error result or let error throw and catch in error boundary
  let pagedResponse: PaginatedDocs<TypeWithID & Record<string, unknown>> =
    await payload.find({
      collection: "posts",
      page: page,
      limit: pageSize,
      sort: "createdAt",
    });

  // TODO: maybe return error from mapper and handle error if do
  const postsResponse = toPostsResponse(pagedResponse);

  return Result.success(postsResponse);
  // return postsResponse;
};
