import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

export type PokemonListItem = {
  name: string;
  url: string;
};
type PokemonListResponse = {
  results?: PokemonListItem[];
  count: number;
};
export type Pokemon = {
  name: string;
  sprite: string;
};
type SinglePokemonResponse = {
  name: string;
  sprites: { front_default: string };
};

export const getAllPokemon = async (limit: number) => {
  const limitQuery = `?limit=${limit}`;
  const res = await axios.get<PokemonListResponse>(baseUrl + limitQuery);

  return res?.data?.results;
};

export const getAllPokemonV2 = async (limit: number, offset?: number) => {
  offset = offset ?? 0;
  const pageQuery = `?limit=${limit}&offset=${offset}`;
  const res = await axios.get<PokemonListResponse>(baseUrl + pageQuery);

  return { pokemon: res?.data?.results, count: res?.data?.count ?? 0 };
};

export const getAllPokemonV3 = async (pageSize: number, pageIndex: number) => {
  const offset = pageIndex * pageSize; // so page number == 1, page index == 0, offset == 0 (0 * pageSize === 0)
  const pageQuery = `?limit=${pageSize}&offset=${offset}`;
  const res = await axios.get<PokemonListResponse>(baseUrl + pageQuery);

  return { pokemon: res?.data?.results, count: res?.data?.count ?? 0 };
};

// TOBE used by getStaticPaths and building the first page of dynamic pages on the server
// only really need this method as dont use url at mo?
export const getPokemonIds = async (limit: number) => {
  const limitQuery = `?limit=${limit}`;
  const res = await axios.get<PokemonListResponse>(baseUrl + limitQuery);

  return res?.data?.results?.map((p) => p.name) ?? [];
};

export const getSinglePokemon = async (
  pokemonName: string
): Promise<Pokemon> => {
  const res = await axios.get<SinglePokemonResponse>(baseUrl + pokemonName);
  return {
    name: res.data.name,
    // types: res.data.types,
    sprite: res.data.sprites.front_default,
  };
};
