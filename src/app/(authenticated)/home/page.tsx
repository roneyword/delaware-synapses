import Header from "@/components/Header";
import { HomeProjectsContainer } from "./styles";
import ErrorPage from "@/components/PageError";
import Wrapper from "@/components/Wrapper";
import Card from "@/components/Card";
import { cookies } from "next/headers";

type ProjectProps = {
  projectId: number;
  projectUuid: string;
  name: string
  isActive: boolean;
}

type ClientProps = {
  clientId: number;
  clientUuid: string;
  isActive: boolean;
  name: string;
  projectList: ProjectProps[];
}

export default async function Home() {
  const data = await fetch(process.env.NEXT_PUBLIC_NEXT_BASE_URL+"/api/home", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookies().get("access_token")?.value}`
    },
  })
  .then((res) => res.json());

  return (
    <>
      <Header />
      <Wrapper>
        {data && Array.isArray(data) ? (
          data.map((project: ClientProps) => (
            <HomeProjectsContainer key={project.clientId}>
              <h2 className="home-projects-title">{project.name}</h2>
              <div className="home-projects-grid">
                {project.projectList.map((list) => (
                  list.isActive && <Card
                    key={list.projectUuid}
                    headerTitle={`${project.name} - ${list.name}`}
                    link={`/control-center/${list.projectUuid}`}
                    title={list.name}
                  />
                ))}
              </div>
            </HomeProjectsContainer>
          ))
        ) : (
          <ErrorPage />
        )}
      </Wrapper>
    </>
  );
}
