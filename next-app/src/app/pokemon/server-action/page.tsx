import React from "react";
import { fetchPokemons } from "./actions";
import PokemonList from "./pokemon-list";

const Page = async () => {
  // just get first 10 from server for now to test working
  const { pokemons } = await fetchPokemons(0, 10);
  // currently no error response that get from react query or error handling
  if (pokemons) {
    return <PokemonList initialData={pokemons} />;
  }
};

export default Page;
