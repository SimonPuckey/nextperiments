"use server";
import { TypeWithID } from "payload/types";
import getPayloadClient from "../../../payload/payloadClient";
import { PaginatedDocs } from "payload/database";
import { toPostsPage } from "./mappers";

export const getPosts = async (page: number, pageSize: number) => {
  const payload = await getPayloadClient();
  // https://payloadcms.com/docs/local-api/overview#find
  let pagedResponse: PaginatedDocs<TypeWithID & Record<string, unknown>>;
  try {
    pagedResponse = await payload.find({
      collection: "posts",
      page: page,
      limit: pageSize,
      sort: "createdAt",
    });
  } catch (error) {
    console.log("log error", error);
    throw error;
  }

  return await toPostsPage(pagedResponse);
};
