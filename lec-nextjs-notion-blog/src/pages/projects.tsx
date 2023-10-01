import Head from "next/head";
import { DATABASE_ID, TOKEN } from "@/config";
import ProjectItem from "@/components/ProjectItem";

export default function Projects({ projects }: any) {
  console.log(projects);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen mb-10 px-6">
      <Head>
        <title>프로젝트</title>
        <meta name="description" content="박상원의 블로그입니다" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fanpmvicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold sm:text-6xl">
        총 프로젝트 :
        <span className="px-4 text-blue-500">{projects.results.length}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 py-10 m-6 gap-8 p-4 w-full">
        {projects.results.map((project: any) => (
          <ProjectItem key={project.id} data={project} />
        ))}
      </div>
    </div>
  );
}

// 빌드 타임에 호출
export async function getStaticProps() {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ page_size: 100 }),
    sorts: [{ property: "Name", direction: "ascending" }],
  };

  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    options
  );

  const projects = await res.json();

  return {
    props: { projects },
  };
}
