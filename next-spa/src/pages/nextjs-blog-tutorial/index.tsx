import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle, name } from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const { pathname } = useRouter();
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>{`Hi, I'm ${name}, so-called because my knax are full of fat`}</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <Link href={`${pathname}/posts/first-post`}>See first demo post</Link>
    </Layout>
  );
}
