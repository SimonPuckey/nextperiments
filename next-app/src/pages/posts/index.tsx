import { find } from "@/features/posts/api";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticProps } from "next";

import styled from "styled-components";

export default function FindPosts() {
  const { isSuccess, data, isLoading, isError } = useQuery({
    queryKey: ["findPosts"],
    queryFn: () => find(),
    // NOTE: If impl this then query nevers gets run client-side because cached pop'd on server-side?
    // TODO: understand react-query caching
    // cacheTime: Infinity,
  });

  if (isLoading) {
    return <div className="center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="center">
        We could not find any posts
        <span role="img" aria-label="sad">
          😢
        </span>
      </div>
    );
  }

  if (isSuccess && data) {
    return (
      <PostCardBox>
        {data.docs.map((doc) => (
          <PostCard key={doc.id}>
            <p>{doc.title}</p>
          </PostCard>
        ))}
      </PostCardBox>
    );
  }

  return <></>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();
  console.log("before prefetch");
  await queryClient.prefetchQuery(["findPosts"], () => find());
  console.log("after prefetch");
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

/**
 * When ready can re-impl 1000BC desktop styling if required
 */

const PostCardBox = styled.div`
  display: flex;
  width: 800px;
  justify-content: space-between;
`;

const PostCard = styled.div`
  display: block;
  width: 200px;
  height: 200px;
  background-color: white;
  color: black;
`;
