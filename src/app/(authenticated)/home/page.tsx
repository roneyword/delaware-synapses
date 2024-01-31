import { getProjects } from "@/app/api/projects";
import Header from "@/components/Header";

import Teste from "./teste";

export default async function Home() {
  const responseProjects = await getProjects();

  return (
    <>
      <Header />
      <Teste responseProjects={responseProjects} />
    </>
  );
}
