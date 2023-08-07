import React from "react";
import { getSinglePokemon, getPokemonIds, Pokemon } from "../api";
import PokemonCard from "../components/PokemonCard";
import { GetStaticPaths, GetStaticProps } from "next";

const SinglePokemon = ({ pokemon: pokemonDetail }: { pokemon: Pokemon }) => {
  if (pokemonDetail) {
    return (
      <div className="container">
        <PokemonCard name={pokemonDetail.name} image={pokemonDetail.sprite} />
      </div>
    );
  }

  return <></>;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const pokemon = await getSinglePokemon(id);
  return {
    props: {
      pokemon,
    },
  };
};

export default SinglePokemon;

// Need getStaticPaths to statically generate pages with dynamic routes
// https://nextjs.org/learn/basics/dynamic-routes/page-path-external-data
export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible values for [id]
  const ids = await getPokemonIds(10);
  console.log("pokemon ids", ids);
  const paths = ids.map((id) => ({
    params: {
      id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
