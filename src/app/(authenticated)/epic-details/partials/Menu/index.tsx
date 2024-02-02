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

interface MenuProps {
  token: string,
  phases: any,
  epics: any
}

export default function Menu({ token, phases, epics }: MenuProps) {
  const decript = JSON.parse(cryptography.decript(token));
  const [phaseName, setPhaseName] = useState<string>(decript.phaseName);

  const phaseFilter = phases.find((phase: any) => phase.title === phaseName);
  const epicFilter = epics.find((epic: any) => epic.phaseId === phaseFilter?.phaseId);
  const epicFindrelatePhase = epics.filter((epic: any) => epic.phaseId === phaseFilter?.phaseId);

  const renderPhaseView = () => {
    if (phaseFilter) {
      return (
        <CardProgress
          completeWork={phaseFilter.completeWork}
          percentComplete={phaseFilter.percentComplete}
          name={phaseFilter.name}
          totalWork={phaseFilter.totalWork}
        />
      );
    }
    return null;
  };

  const renderPhaseDropdown = () => {
    return phases.map((phase: any) => {
      if (phase.name !== phaseName) {
        return (
          <CardProgress
            key={phase.phaseId}
            link={cryptography.encript({
              project: decript.project,
              phaseId: phase.phaseId,
              phaseName: phase.name,
            })}
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
        <ProgressBar
          step={epicFilter.step}
          name={epicFilter.name}
          phase={phaseFilter.title}
          plannedDate={epicFilter.plannedDate}
          completeWork={epicFilter.completeWork}
          totalWork={epicFilter.totalWork}
          percentComplete={epicFilter.percentComplete}
        />
      );
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
            phase={phaseFilter.title}
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
  }, [phaseName]);


  const handleChange = (name: string) => {
    setPhaseName(name)
  }

  return (
    <MenuDetailsContainer>
      <button onClick={() => handleChange("Explore")}>trocar</button>
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
              <DropDownCards
                isDropDown={phases.length > 1}
                projectName={phaseName}
                title={phaseName}
                children={renderPhaseDropdown()}
              />
              {renderPhaseView()}
            </div>

            <div className="phases-container-item">
              <div className="phases-container-item">
                <DropDownCards
                  isDropDown={epicFindrelatePhase.length > 1}
                  projectName={phaseFilter.title}
                  title={"Epic"}
                  children={renderEpicDropdown()}
                />
              </div>
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
  )
}