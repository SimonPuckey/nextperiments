import React from "react";
import getPayloadClient from "../../../payload/payloadClient";

// TODO: typing for payload response
// TODO: typing for posts collection ion docs array
// type PayloadRespoonse = {
//     docs:
// }

const Page = async () => {
  const payload = await getPayloadClient();
  const posts = await payload.find({
    collection: "posts",
  });

  //   console.log("in posts page", posts);

  return (
    <>
      <h1>Hello, here are some post titles</h1>
      <ul>
        {posts.docs.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </>
  );
};

export default Page;
