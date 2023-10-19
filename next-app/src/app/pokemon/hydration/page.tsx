// kinda replaces GetStaticProps as a server component
// more like a container for server-side prefetching!

import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { getAllPokemonV4 } from "@/features/pokemon/api";
import PokemonFeed from "./pokemon-feed";
import { dehydrate } from "@tanstack/react-query";

export default async function Hydration() {
  const queryClient = getQueryClient();
  // TODO might be good to make this component generic and pass a query object?
  const pageParam = 0;
  const pageSize = 10;
  await queryClient.prefetchInfiniteQuery(["getInfinitePokemon"], () => {
    return getAllPokemonV4(pageParam, pageSize);
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      {/* to make this reusable this would have to be children? */}
      <PokemonFeed pageSize={pageSize} />
    </Hydrate>
  );
}
