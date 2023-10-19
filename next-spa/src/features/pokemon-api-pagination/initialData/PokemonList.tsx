// from https://nextjs.org/learn/basics/data-fetching/implement-getstaticprops
import Link from "next/link";
import { getAllPokemon, PokemonListItem } from "../api";
import Layout from "../../../components/layout";
import utilStyles from "../../../styles/utils.module.css";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

const PokemonList = ({
  initialPokemonData,
}: {
  initialPokemonData: PokemonListItem[];
}) => {
  const { pathname } = useRouter();

  if (initialPokemonData) {
    return (
      <Layout home>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Pokemon</h2>
          <ul className={utilStyles.list}>
            {initialPokemonData.map(({ name }) => (
              <li className={utilStyles.listItem} key={name}>
                <Link href={`${pathname}/${name}`}>{name}</Link>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    );
  }

  return <></>;
};

export default PokemonList;

// Initial data style
export const getStaticProps: GetStaticProps = async () => {
  // TODO: change how pass in result limit or maybe try pagination
  const initialPokemonData = await getAllPokemon(10);
  return {
    props: {
      initialPokemonData,
    },
  };
};
