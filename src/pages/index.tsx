import Head from "next/head";

import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>SANGWON BLOG</title>
        <meta name="description" content="박상원의 블로그입니다" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fanpmvicon.ico" />
      </Head>

      <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <Hero />
        </div>
      </section>
    </>
  );
}
