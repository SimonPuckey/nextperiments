import React from "react";
import { useRouter } from "next/router";
import { getSinglePokemon, getPokemonIds } from "../../../features/pokemon/api";
import PokemonCard from "../../../features/pokemon/components/PokemonCard";
import { GetStaticPaths, GetStaticProps } from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";

// think need to pass pokemon name to component if using get static props...?
// export default function Pokemon() {
//    const router = useRouter()
//    const pokemonName = typeof router.query?.id === 'string' ? router.query.id : ''

//    // todo: type data pokemon
//    const {
//       isSuccess,
//       data: pokemon,
//       isLoading,
//       isError
//    } = useQuery(['getPokemonByName', pokemonName], () => getPokemonByName(pokemonName), {
//       enabled: pokemonName.length > 0
//    })

//    if (isSuccess) {
//       return (
//          <div className="container">
//             {/* todo: just do name and image for now */}
//             <PokemonCard
//                name={pokemon.name}
//                image={pokemon.sprite}
//                // weight={pokemon.weight}
//                // xp={pokemon.base_experience}
//                // abilities={pokemon.abilities?.map((item) => item.ability.name)}
//             />
//          </div>
//       )
//    }

//    if (isLoading) {
//       return <div className="center">Loading...</div>
//    }

//    if (isError) {
//       return (
//          <div className="center">
//             We couldn't find your pokemon{' '}
//             <span role="img" aria-label="sad">
//                😢
//             </span>
//          </div>
//       )
//    }

//    return <></>
// }

// Version without react-query first...
// better name than PokemonPage
// export default function SinglePokemon({ pokemon: pokemonDetail }: { pokemon: Pokemon }) {
// console.log('pokemon to be displayed is:', pokemonDetail)
const SinglePokemon = () => {
  const router = useRouter();
  // is it query or is part of path?
  const pokemonName =
    typeof router.query?.id === "string" ? router.query.id : "";

  // // implement react-query
  const {
    isSuccess,
    data: pokemonDetail,
    isLoading,
    isError,
  } = useQuery(
    ["getSinglePokemon", pokemonName],
    () => getSinglePokemon(pokemonName),
    {
      enabled: pokemonName.length > 0,
    }
  );

  if (isSuccess && pokemonDetail) {
    return (
      <div className="container">
        <PokemonCard name={pokemonDetail.name} image={pokemonDetail.sprite} />
      </div>
    );
  }

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

  // TODO: dont know if best to return empty fragment while no status from useQuery?
  return <></>;
};

export default SinglePokemon;

// TODO: first try without react query and fancy hydration
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//    const id = params?.id as string
//    const pokemon = await getSinglePokemon(id)
//    return {
//       props: {
//          pokemon
//       }
//    }
// }

// with de/hydrate
export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["getSinglePokemon", id], () =>
    getSinglePokemon(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

// BUT! do get static paths apparently
// to statically generate pages with dynamic routes
// https://nextjs.org/learn/basics/dynamic-routes/page-path-external-data
// TODO: does using de/ydrate affect getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible value for id
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
