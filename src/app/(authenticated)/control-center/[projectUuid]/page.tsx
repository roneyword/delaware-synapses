import Card from "@/components/Card";
import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";

import iconPast from "@/assets/icons/cc-project.svg";
import CardProgress from "@/components/CardProgress";
import { EpicContainer, PhaseContainer } from "./styles";
import ProgressBar from "@/components/ProgressBar";
import { cryptography } from "@/utils/cryptography";
import { PhaseProps, findPhasesByProjectId } from "@/actions/phases";
import { findEpicsByFaseIdAndProjectId } from "@/actions/epic";
import React from "react";
import PageError from "@/components/PageError";
interface ControlCenterProps {
  params: { projectUuid: string };
}

export default async function ControlCenter({ params }: ControlCenterProps) {
  const responsePhases = await findPhasesByProjectId(params.projectUuid);
  let allEpics;

  if (responsePhases === undefined || !Array.isArray(responsePhases)) {
    return <PageError />;
  }

  if (responsePhases && Array.isArray(responsePhases)) {
    const epicPromises = responsePhases.map(async (phase) => {
      const epics = await findEpicsByFaseIdAndProjectId(
        phase.phaseId,
        params.projectUuid
      );
      return epics;
    });

    const allEpicsNested = await Promise.all(epicPromises);
    allEpics = allEpicsNested.flat();
  }

  const getNamePhases = (id: number) => {
    const phase = responsePhases?.find((phase) => phase.phaseId === id);

    return phase ? phase.title : "prepare";
  };

  const renderGroupedProgressBars = (epics: any) => {
    const totalItems = epics.length;
    const groupedProgressBars: any = [[], [], []];

    for (let i = 0; i < totalItems; i++) {
      const columnIndex = i % 3;
      groupedProgressBars[columnIndex].push(
        <ProgressBar
          key={i}
          step={epics[i].step}
          name={epics[i].name}
          phase={getNamePhases(epics[i].phaseId)}
          plannedDate={epics[i].plannedDate}
          completeWork={epics[i].completeWork}
          totalWork={epics[i].totalWork}
          percentComplete={epics[i].percentComplete}
          tooltip={epics[i].name}
          link={cryptography.encript({
            project: params.projectUuid,
            phaseId: epics[i].phaseId,
            epicId: epics[i].epicId,
          })}
        />
      );
    }

    return groupedProgressBars.map((column: any, index: any) => (
      <div key={index} style={{ flex: 1 }}>
        {column.map((progressBar: any, idx: any) => (
          <React.Fragment key={idx}>{progressBar}</React.Fragment>
        ))}
      </div>
    ));
  };

  return (
    <>
      <Header title="Control Center" />
      <Wrapper>
        <Card
          link={"/home"}
          title="Projects"
          text="From clients list"
          icon={iconPast}
        />
      </Wrapper>

      <Wrapper title="PHASES">
        <PhaseContainer>
          {responsePhases.map((phase: PhaseProps) => (
            <CardProgress
              link={cryptography.encript({
                project: params.projectUuid,
                phaseId: phase.phaseId,
              })}
              completeWork={phase.completeWork}
              percentComplete={phase.percentComplete}
              title={phase.title}
              name={phase.name}
              totalWork={phase.totalWork}
            />
          ))}
        </PhaseContainer>
      </Wrapper>

      <Wrapper title="EPICS">
        <EpicContainer>
          {renderGroupedProgressBars(allEpics)}
        </EpicContainer>
      </Wrapper>
    </>
  );
}
