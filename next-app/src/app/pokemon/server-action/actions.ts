"use server";

type PokemonIds = {
  name: string;
  url: string;
};

type PokemonData = {
  pokemons: PokemonIds[];
  moreData: string | boolean;
};

export const fetchPokemons = async (
  pageParam: number,
  pageSize: number
): Promise<PokemonData> => {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  const offset = pageParam > 0 ? pageParam * pageSize : 0; //sanitise to zero
  const pageQuery = `?offset=${offset}&limit=${pageSize}`;

  // try with fetch api
  const res = await fetch(baseUrl + pageQuery);
  // console.log("in getAllPokemonv4 after get req");
  // console.log("pokenemon list res", res);
  const data = await res.json();
  // console.log("response data", data);

  return {
    pokemons: data?.results,
    moreData: data?.next ?? false,
  };

  /* NOTE: 
  GIVEN action handles requests from client components
  AND result data contains non-string values 
  THEN data will need to be stringified e.g. JSON.Parse(JSON.Stringify(responseData))
  SO nextjs can serialise the communication between client and server
  */

  // axios original
  // const res = await axios.get<PokemonListResponse>(baseUrl + pageQuery);
  // return {
  //   pokemon: res?.data?.results,
  //   moreData: res?.data?.next ?? false,
  // };
};
