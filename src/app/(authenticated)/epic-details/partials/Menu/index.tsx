"use client"

import Wrapper from "@/components/Wrapper";
import { MenuDetailsContainer } from "./styles";
import Legend from "@/components/legend";
import Card from "@/components/Card";
import iconPast from "@/assets/icons/cc-project.svg";
import { DropDownCards } from "../DropdownCard";
import ProgressBar from "@/components/ProgressBar";
import { cryptography } from "@/utils/cryptography";
import CardProgress from "@/components/CardProgress";
import { useEffect, useState } from "react";
import Feature from "../Feature";

interface MenuProps {
  token: string,
  phases: any,
  epics: any
}

export default function Menu({ token, phases, epics }: MenuProps) {
  const decript = JSON.parse(cryptography.decript(token));
  const phaseFindName = phases.find((phase: any) => phase.phaseId === decript.phaseId);
  const [phaseName, setPhaseName] = useState<string>(phaseFindName.name);

  const phaseFilter = phases.find((phase: any) => phase.title === phaseName);
  const epicFilter = epics.find((epic: any) => epic.phaseId === decript.epicId ? decript.epicId : phaseFilter?.phaseId);

  const [currentEpic, setcurrentEpic] = useState<any>(epicFilter);

  const phaseTitle = phaseFilter.title
  const epicFindrelatePhase = epics.filter((epic: any) => epic.phaseId === phaseFilter?.phaseId);

  const renderPhaseView = () => {

    if (phaseFilter) {
      return (
        <>
          <DropDownCards
            isDropDown={phases.length > 1}
            projectName={phaseName}
            title={phaseName}
            children={renderPhaseDropdown()}
          />

          <CardProgress
            completeWork={phaseFilter.completeWork}
            percentComplete={phaseFilter.percentComplete}
            name={phaseFilter.name}
            totalWork={phaseFilter.totalWork}
          />
        </>
      )
    }
    return null;
  };

  const renderPhaseDropdown = () => {
    return phases.map((phase: any) => {
      if (phase.name !== phaseName) {
        return (
          <CardProgress
            link={phase.title}
            isRefresh={() => setPhaseName(phase.title)}
            key={phase.phaseId}
            completeWork={phase.completeWork}
            percentComplete={phase.percentComplete}
            title={phase.title}
            name={phase.name}
            totalWork={phase.totalWork}
          />
        );
      }
      return null;
    });
  };

  const renderEpicView = () => {
    if (epicFilter) {
      return (
        <>
          <DropDownCards
            isDropDown={epicFindrelatePhase.length > 1}
            projectName={phaseTitle}
            title={"Epic"}
            children={renderEpicDropdown()}
          />

          <ProgressBar
            step={epicFilter.step}
            name={epicFilter.name}
            phase={phaseTitle}
            plannedDate={epicFilter.plannedDate}
            completeWork={epicFilter.completeWork}
            totalWork={epicFilter.totalWork}
            percentComplete={epicFilter.percentComplete}
            tooltip={epicFilter.name}
          />
        </>
      )
    }
    return null;
  };

  const renderEpicDropdown = () => {
    return (
      epicFindrelatePhase.map((epic: any) => {
        return (
          <ProgressBar
            key={epic.epicId}
            step={epic.step}
            name={epic.name}
            phase={phaseTitle}
            plannedDate={epic.plannedDate}
            completeWork={epic.completeWork}
            totalWork={epic.totalWork}
            percentComplete={epic.percentComplete}
          />
        );
      })
    );
  };

  useEffect(() => {
    setcurrentEpic(epicFilter)
  }, [phaseName]);

  return (
    <>
      <MenuDetailsContainer>
        <div className="header-wrapper">
          <Wrapper>
            <Card
              link={`/control-center/${decript.project}`}
              title="Control Center"
              text="Back to Dashboard"
              icon={iconPast}
            />
          </Wrapper>
        </div>
        <div className="header-wrapper main">
          <Wrapper>
            <div className="phases-container">
              <div className="phases-container-item">
                {renderPhaseView()}
              </div>

              <div className="phases-container-item">
                {renderEpicView()}
              </div>
            </div>
          </Wrapper>
        </div>
        <div className="header-wrapper">
          <Wrapper>
            <Legend />
          </Wrapper>
        </div>
      </MenuDetailsContainer>

      <Feature currentEpic={currentEpic} token={token} />
    </>
  )
}