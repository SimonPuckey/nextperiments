import Layout from "@/components/layout";
import { getAllPokemonV4 } from "@/features/pokemon/api";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import PokemonCard from "@/features/pokemon/components/PokemonCard";
import { useCallback, useRef } from "react";
import styled from "styled-components";
import {
  useInfiniteQuery,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

/* TODO:
> link site title to home
> link feed list item to own page
*/

/* Styles */
// TODO see point why better to centralise styles in design system / UI component lib
const HeadingLg = styled.h2`
  font-size: 1.5rem;
  line-height: 1.4;
  margin: 1rem 0;
`;
const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const StyledListItem = styled.li`
  margin: 0 0 1.25rem;
`;

/* Component */
const pageSize = 10;
const PokemonInfiniteList = () => {
  const { pathname } = useRouter();
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery(
    ["getInfinitePokemon", pageSize],
    ({ pageParam }) => getAllPokemonV4(pageParam, pageSize),
    {
      getNextPageParam: (lastPage, pages) => {
        // this function determines the pageParam that gets passed to the query fn
        // return lastPage.offset;
        // from docs: Return undefined to indicate there is no next page available.
        return lastPage.moreData ? pages.length : undefined;
      },
    }
  );

  // object ref for IntersectionObserver
  const observer = useRef<IntersectionObserver>();

  // callback ref for DOM element
  // rather than storing a ref to DOM elem will execute function with elem as arg, when elem is rendered
  const handleIntersection = useCallback(
    (node: HTMLLIElement) => {
      // if data loading then bail...
      if (isLoading) return;
      // if IntersectionObserver already assigned to observer ref then remove assignment
      if (observer.current) observer.current.disconnect();
      // assign intersection observer that fetches next page
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, isFetching, fetchNextPage]
  );

  // TODO: as infinite query may need to handle more response states
  if (isLoading) {
    return <div className="center">Loading...</div>;
  }
  if (isError) {
    return (
      <div className="center">
        We could not find pokemon!
        <span role="img" aria-label="sad">
          😢
        </span>
      </div>
    );
  }

  if (data) {
    return (
      <Layout>
        <section>
          <HeadingLg>Pokemon</HeadingLg>
          <StyledList>
            {data?.pages?.map((page, i) => (
              <div key={i}>
                {page.pokemon.map(({ name }, i) => (
                  <StyledListItem
                    key={name}
                    ref={
                      page.pokemon.length - 1 === i ? handleIntersection : null
                    }
                  >
                    {/* <Link href={`${pathname}/${name}`}>{name}</Link> */}
                    <PokemonCard name={name} />
                  </StyledListItem>
                ))}
              </div>
            ))}
          </StyledList>
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            Load more
          </button>
        </section>
      </Layout>
    );
  }
};

export default PokemonInfiniteList;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();
  const pageIndex = 0;

  await queryClient.prefetchQuery(["getInfinitePokemon", pageIndex], () =>
    getAllPokemonV4(pageIndex, pageSize)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

/* DOCS */
/*
INFINITE REACT-QUERY
https://tanstack.com/query/v4/docs/react/guides/infinite-queries
PAGINATION
https://blog.logrocket.com/pagination-infinite-scroll-react-query-v3/
CALLBACK REFS
https://tkdodo.eu/blog/avoiding-use-effect-with-callback-refs
https://julesblom.com/writing/ref-callback-use-cases
*/
