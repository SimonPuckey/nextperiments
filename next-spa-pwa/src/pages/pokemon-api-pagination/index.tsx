import Link from "next/link";
import { getAllPokemonV3 } from "../../features/pokemon-api/api";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useState } from "react";
import { Pagination } from "../../features/pokemon-api/components/Pagination";

const pageSize = 10;

// FOR DIFF BUT USEFUL PAGINATION
// https://blog.logrocket.com/pagination-infinite-scroll-react-query-v3/
const PokemonList = () => {
  const { pathname } = useRouter();
  //  console.log('path name is ', pathname)

  // state needs to be in a parent component as the parent needs to know which page to query for
  // BUT DONT like it here because couples this page to pagination
  // JUST DO IT for now to get working and can theorise later
  // make this 1 based instead of zero so reads better?
  const [pageIndex, setPage] = useState(0);

  /* calc offset for pagination
   * set up page links first but...
   * offset should be product of limit and page number in link
   * if limit is 10...
   * | page | offset |
   * -----------------
   * | 1    |  0     |
   * | 2    |  10    |
   */

  // TODO: prev have i not wrapped queries inside another hook?
  const { isSuccess, data, isLoading, isError } = useQuery({
    // NOTE so if caches is only ever going to return first 10 got by initial data
    // TODO: need to think about pagination and react query asap
    queryKey: ["getAllPokemon", pageIndex],
    queryFn: () => getAllPokemonV3(pageSize, pageIndex),
    // so when loads component will get data from cache rather than make request
  });

  if (isSuccess && data) {
    return (
      <Layout home>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Pokemon</h2>
          <ul className={utilStyles.list}>
            {data.pokemon?.map(({ name }) => (
              <li className={utilStyles.listItem} key={name}>
                <Link href={`${pathname}/${name}`}>{name}</Link>
              </li>
            ))}
          </ul>
        </section>
        <Pagination count={data.count} pageSize={pageSize} setPage={setPage} />
      </Layout>
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

  return <></>;
};

export default PokemonList;

// from https://nextjs.org/learn/basics/data-fetching/implement-getstaticprops
export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();
  const pageIndex = 0;

  await queryClient.prefetchQuery(["getAllPokemon", pageIndex], () =>
    getAllPokemonV3(pageSize, pageIndex)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
