"use client";
import PokemonCard from "@/features/pokemon/components/PokemonCard";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { fetchPokemons } from "./actions";

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

// TODO: share type - in actions as well
type PokemonIds = {
  name: string;
  url: string;
};

type PokemonListProps = {
  initialData: PokemonIds[];
};

const PokemonList = ({ initialData }: PokemonListProps) => {
  // initialise state with data passed in from server component
  const [pokemons, setPokemons] = useState(initialData);
  // may do something funky with server action retruning next page number so is better encapsulated
  const [page, setPage] = useState(1);

  // TODO: fn to load more pokemons by calling server action - replacing react-query

  const loadMore = useCallback(async () => {
    console.log("in load more with page", page);
    const nextPage = page + 1;
    console.log("in load more with nextpage", nextPage);
    // todo: pass down page size from parent comp as prop
    // todo: handle moreData boolean from action response so know if more pages
    const pokemonData = await fetchPokemons(page, 10);
    // pass fn to use state to compute new state by merging prev and new state
    if (pokemonData?.pokemons.length) {
      setPage(nextPage);
      console.log("after set page with next page", nextPage);
      setPokemons((prev) => [...prev, ...pokemonData.pokemons]);
    }
  }, [page]);

  // object ref for IntersectionObserver
  const observer = useRef<IntersectionObserver>();

  // callback ref for DOM element
  // rather than storing a ref to DOM elem will execute function with elem as arg, when elem is rendered
  const handleIntersection = useCallback(
    (node: HTMLLIElement) => {
      // if data loading then bail...
      // TODO: replace react-query functionality?
      //   if (isLoading) return;
      // if IntersectionObserver already assigned to observer ref then remove assignment
      if (observer.current) observer.current.disconnect();
      // assign intersection observer that fetches next page
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          //   loadMore();
          loadMore();
        }
        // TODO: replace react-query functionality?
        // if (entries[0].isIntersecting && hasNextPage && !isFetching) {
        //   fetchNextPage();
        // }
      });
      if (node) observer.current.observe(node);
    },
    // [isLoading, hasNextPage, isFetching, fetchNextPage]
    [loadMore] // TODO: should i have load more in here but causes error
  );

  return (
    <section>
      <HeadingLg>Pokemon</HeadingLg>
      <StyledList>
        {pokemons.map(({ name }, i) => {
          return (
            <StyledListItem
              key={name}
              ref={pokemons.length - 1 === i ? handleIntersection : null}
            >
              <PokemonCard name={name} />
            </StyledListItem>
          );
        })}
      </StyledList>
    </section>
  );
};

export default PokemonList;
