import Header from "@/components/Header";
import { HomeProjectsContainer } from "./styles";
import ErrorPage from "@/components/PageError";
import Wrapper from "@/components/Wrapper";
import Card from "@/components/Card";
import { ClientProps, ProjectProps, getProjects } from "@/actions/projects";

export default async function Home() {
  const responseProjects = await getProjects();

  if (!responseProjects) {
    return <ErrorPage />;
  }

  return (
    <>
      <Header />
      <Wrapper>
        {responseProjects.map((project: ClientProps) => (
          <HomeProjectsContainer key={project.clientId}>
            <h2 className="home-projects-title">{project.name}</h2>
            <div className="home-projects-grid">
              {project.projectList.map((list: ProjectProps) => (
                <Card
                  key={list.projectUuid}
                  headerTitle={`${project.name} - ${list.name}`}
                  link={`/control-center/${list.projectUuid}`}
                  title={list.name}
                />
              ))}
            </div>
          </HomeProjectsContainer>
        ))}
      </Wrapper>
    </>
  );
}
