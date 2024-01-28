import Card from "@/components/Card"
import Header from "@/components/Header"
import Wrapper from "@/components/Wrapper"

import iconPast from "@/assets/icons/cc-project.svg"
import CardProgress from "@/components/CardProgress"
import { PhaseContainer } from "./styles"
import ProgressBar from "@/components/ProgressBar"

interface ControlCenterProps {
  params: { projectUuid: string }
}

const phases = [
  {
    percentComplete: 100,
    title: "Prepare",
    name: "Prepare",
    totalWork: 48,
    completeWork: 48
  },
  {
    percentComplete: 22,
    title: "Explore",
    name: "Explore",
    totalWork: 122,
    completeWork: 27
  },
  {
    percentComplete: 22,
    title: "Realize",
    name: "Realize",
    totalWork: 122,
    completeWork: 27
  },
  {
    percentComplete: 22,
    title: "Deploy",
    name: "Deploy",
    totalWork: 122,
    completeWork: 27
  },
  {
    percentComplete: 22,
    title: "run",
    name: "run",
    totalWork: 122,
    completeWork: 27
  }

]

const epics = [
  {
    step: 10,
    name: "Prepare",
    phases: "Prepare",
    plannedDate: "29/12/2023",
    completeWork: 48,
    totalWork: 48,
    percentComplete: 100
  },
  {
    step: 5,
    name: "Explore - ECC SBX",
    phases: "Explore",
    plannedDate: "29/12/2023",
    completeWork: 20,
    totalWork: 48,
    percentComplete: 15
  },
  {
    step: 5,
    name: "Realize - DEV",
    phases: "Realize",
    plannedDate: "29/12/2023",
    completeWork: 20,
    totalWork: 48,
    percentComplete: 15
  }
]

export default function ControlCenter({ params }: ControlCenterProps) {

  return (
    <>
      <Header title="Control Center" text="Lunar Dynamics - Pré-projeto Browfield" />
      <Wrapper>
        <Card link={"/home"} title="Projects" text="From clients list" icon={iconPast} />
      </Wrapper>
      <Wrapper title="PHASES">
        <PhaseContainer>
          {phases.map(item => (
            <CardProgress completeWork={item.completeWork} percentComplete={item.percentComplete} title={item.title} name={item.name} totalWork={item.totalWork} />
          ))}
        </PhaseContainer>
      </Wrapper>

      <Wrapper title="EPICS">
        <PhaseContainer>
          {epics.map(item => (
            <ProgressBar step={item.step} name={item.name} phase={item.phases} plannedDate={item.plannedDate} completeWork={item.completeWork} totalWork={item.totalWork} percentComplete={item.percentComplete} />
          ))}
        </PhaseContainer>
      </Wrapper>
    </>
  )

}