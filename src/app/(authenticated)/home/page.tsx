import { getProjects } from "@/app/api/projects";
import Header from "@/components/Header";

import { HomeProjectsContainer } from "./styles";
import { ClientProps } from "@/app/api/projects/types";
import ErrorPage from "@/components/PageError";
import Wrapper from "@/components/Wrapper";
import Card from "@/components/Card";

export default async function Home() {
  const responseProjects = await getProjects();

  return (
    <>
      <Header />
      <Wrapper>
        {responseProjects && Array.isArray(responseProjects) ? (
          responseProjects.map((project: ClientProps) => (
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
