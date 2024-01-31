import Card from "@/components/Card";
import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";

import iconPast from "@/assets/icons/cc-project.svg";
import CardProgress from "@/components/CardProgress";
import { EpicContainer, PhaseContainer } from "./styles";
import ProgressBar from "@/components/ProgressBar";
import { findPhasesByProjectId } from "@/app/api/phases";
import { findEpicsByFaseIdAndProjectId } from "@/app/api/epic";
import { cryptography } from "@/utils/cryptography";

interface ControlCenterProps {
  params: { projectUuid: string };
}

export default async function ControlCenter({ params }: ControlCenterProps) {
  const responsePhases = await findPhasesByProjectId(params.projectUuid);
  let allEpics;

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

  const renderProgressBarGroup = (epics: any) => {
    return epics.reduce((acc: any, epic: any, index: any) => {
      const progressBar = (
        <ProgressBar
          key={index}
          step={epic.step}
          name={epic.name}
          phase={getNamePhases(epic.phaseId)}
          plannedDate={epic.plannedDate}
          completeWork={epic.completeWork}
          totalWork={epic.totalWork}
          percentComplete={epic.percentComplete}
        />
      );

      if (index % 3 === 0) {
        acc.push([progressBar]);
      } else {
        acc[acc.length - 1].push(progressBar);
      }

      return acc;
    }, []);
  };

  const progressBarGroups = renderProgressBarGroup(allEpics);

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
          {responsePhases &&
            responsePhases.map((phase) => (
              <CardProgress
                link={cryptography.encript({ project: params.projectUuid, phaseId: phase.phaseId, phaseName: phase.name })}
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
          {progressBarGroups.map((group: any, index: any) => (
            <div className="epic-column" key={index}>
              {group}
            </div>
          ))}
        </EpicContainer>
      </Wrapper>
    </>
  );
}
