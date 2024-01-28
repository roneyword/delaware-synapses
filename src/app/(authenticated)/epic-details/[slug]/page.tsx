import Card from "@/components/Card";
import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";

import iconPast from "@/assets/icons/cc-project.svg";
import iconPhase from "@/assets/icons/label-project-phase.svg";
import iconEpic from "@/assets/icons/label-epic.svg";
import iconFeature from "@/assets/icons/label-feature.svg";
import iconUser from "@/assets/icons/label-user-story.svg";
import iconFeatureStatus from "@/assets/icons/feature-status-4.svg";

import {
  HeaderDetailsContainer,
  DetailsLegendContainer,
  DetailsContentContainer,
} from "./styles";

import Image from "next/image";
import Status from "@/components/Status";
import CardProgress from "@/components/CardProgress";
import ProgressBar from "@/components/ProgressBar";
import Accordion from "@/components/Accordion";

interface EpicDetailsProps {
  params: { slug: string };
}

const legendPhase = [
  {
    icon: iconPhase,
    name: "Project Phase",
  },
  {
    icon: iconEpic,
    name: "Epic",
  },
  {
    icon: iconFeature,
    name: "Feature",
  },
  {
    icon: iconUser,
    name: "User Story",
  },
];

const legendStatus: { status: 1 | 2 | 3 | 4; name: string }[] = [
  {
    status: 1,
    name: "Not started",
  },
  {
    status: 2,
    name: "In progress",
  },
  {
    status: 3,
    name: "Failed",
  },
  {
    status: 4,
    name: "Done",
  },
];

const phases = {
  percentComplete: 100,
  title: "",
  name: "Prepare",
  totalWork: 48,
  completeWork: 48,
};

const epics = {
  step: 10,
  name: "Prepare",
  phases: "Prepare",
  plannedDate: "29/12/2023",
  completeWork: 48,
  totalWork: 48,
  percentComplete: 100,
};

const items = [
  {
    title: "1. T08 Systems & Infrastructure",
    content: [
      {
        title: "1. System copy PRD to SBX",
        status: 1,
        responsibleName: "Roney berti",
        plannedDate: "22/04/1989",
        executionDate: "",
        documentationUrl: "",
      },
      {
        title: "1. System copy PRD to SBX",
        status: 1,
        responsibleName: "Roney berti",
        plannedDate: "22/04/1989",
        executionDate: "",
        documentationUrl: "",
      },
    ],
  },
];

export default function EpicDetails({ params }: EpicDetailsProps) {
  return (
    <>
      <Header
        title="Epic Details"
        text="Lunar Dynamics - Pré-projeto Browfield"
      />

      <HeaderDetailsContainer>
        <Wrapper>
          <Card
            link={"/control-center"}
            title="Control Center"
            text="Back to Dashboard"
            icon={iconPast}
          />
        </Wrapper>

        <Wrapper>
          <CardProgress
            completeWork={phases.completeWork}
            percentComplete={phases.percentComplete}
            name={phases.name}
            totalWork={phases.totalWork}
          />

          <ProgressBar
            step={epics.step}
            name={epics.name}
            phase={epics.phases}
            plannedDate={epics.plannedDate}
            completeWork={epics.completeWork}
            totalWork={epics.totalWork}
            percentComplete={epics.percentComplete}
          />
        </Wrapper>

        <Wrapper>
          <DetailsLegendContainer>
            <ul className="details-legend-list">
              {legendPhase.map((phase) => (
                <li key={phase.name}>
                  <figure>
                    <Image src={phase.icon} alt="icon da fase do projeto" />
                  </figure>
                  <span>{phase.name}</span>
                </li>
              ))}
            </ul>

            <ul className="details-legend-list">
              {legendStatus.map((status) => (
                <li key={status.name}>
                  <Status status={status.status} />
                  <span>{status.name}</span>
                </li>
              ))}
            </ul>
          </DetailsLegendContainer>
        </Wrapper>
      </HeaderDetailsContainer>

      <Wrapper>
        <DetailsContentContainer>
          <div className="card-details">
            <CardProgress
              completeWork={phases.completeWork}
              percentComplete={phases.percentComplete}
              name={phases.name}
              totalWork={phases.totalWork}
              icon={iconFeatureStatus}
            />

            <Accordion items={items} />
            <Accordion items={items} />
          </div>
          <div className="card-details">
            <CardProgress
              completeWork={phases.completeWork}
              percentComplete={phases.percentComplete}
              name={phases.name}
              totalWork={phases.totalWork}
              icon={iconFeatureStatus}
            />

            <Accordion items={items} />
            <Accordion items={items} />
          </div>
          <div className="card-details">
            <CardProgress
              completeWork={phases.completeWork}
              percentComplete={phases.percentComplete}
              name={phases.name}
              totalWork={phases.totalWork}
              icon={iconFeatureStatus}
            />

            <Accordion items={items} />
            <Accordion items={items} />
          </div>
        </DetailsContentContainer>
      </Wrapper>
    </>
  );
}
