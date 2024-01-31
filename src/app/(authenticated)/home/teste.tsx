"use client"

import Wrapper from "@/components/Wrapper";
import { HomeProjectsContainer } from "./styles";
import { ClientProps } from "@/app/api/projects/types";
import Card from "@/components/Card";
import ErrorPage from "@/components/PageError";
import { useHeader } from "@/hooks/useHeader";
import { useEffect } from "react";

export default function Teste({ responseProjects }: any) {
  const { titleHeader, updateTitle } = useHeader()

  console.log(titleHeader);
  return (
    <Wrapper>
      <button onClick={() => updateTitle("teste 2")}>teste</button>
      {responseProjects && Array.isArray(responseProjects) ? (
        responseProjects.map((project: ClientProps) => (
          <HomeProjectsContainer key={project.clientId}>
            <h2 className="home-projects-title">{project.name}</h2>
            <div className="home-projects-grid">
              {project.projectList.map((list) => (
                list.isActive && <Card
                  key={list.projectUuid}
                  onClick={() => console.log("teste")}
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
  )
}