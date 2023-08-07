import { find } from "@/features/payload-cms-example/api";
import { GetStaticProps } from "next";
import { QueryClient, dehydrate, useQuery } from "react-query";
import styled from "styled-components";

export default function FindPosts() {
  const { isSuccess, data, isLoading, isError } = useQuery({
    // NOTE so if caches is only ever going to return first 10 got by initial data
    // TODO: need to think about pagination and react query asap
    queryKey: ["findPosts"],
    queryFn: () => find("posts"),
    // so when loads component will get data from cache rather than make request
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

  await queryClient.prefetchQuery(["findPosts"], () => find("posts"));

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
