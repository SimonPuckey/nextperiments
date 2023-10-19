"use client";
import { getAllPokemonV4 } from "@/features/displayPokemon/api";
import PokemonCard from "@/features/displayPokemon/components/PokemonCard";
import { useCallback, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import styled from "styled-components";

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
type PaginationProps = {
  pageSize: number;
};
const PokemonFeed = ({ pageSize }: PaginationProps) => {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery(
    ["getInfinitePokemon"],
    ({ pageParam }) => getAllPokemonV4(pageParam, pageSize),
    {
      getNextPageParam: (lastPage, pages) => {
        // this function determines the pageParam that gets passed to the query fn
        // return lastPage.offset;
        // from docs: Return undefined to indicate there is no next page available.
        return lastPage.moreData ? pages.length : undefined;
      },
      // NOTE: may be usefult to leave as 'true' but confusing when confirming server-side rendering
      // refetchOnWindowFocus: false,
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
      <section>
        <HeadingLg>Pokemon</HeadingLg>
        <StyledList>
          {data?.pages?.map((page, i) => (
            <div key={i}>
              {page.pokemon.map(({ name }, i) => {
                return (
                  <StyledListItem
                    key={name}
                    ref={
                      page.pokemon.length - 1 === i ? handleIntersection : null
                    }
                  >
                    {/* <Link href={`${pathname}/${name}`}>{name}</Link> */}
                    <PokemonCard name={name} />
                  </StyledListItem>
                );
              })}
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
    );
  }

  // ...
  //   return <h1>will be a list of pokemon 1 day!</h1>;
};

export default PokemonFeed;
