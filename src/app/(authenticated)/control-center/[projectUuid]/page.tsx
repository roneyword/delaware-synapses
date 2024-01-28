import BackgroundImg from "@/components/BackgroundImg"
import Card from "@/components/Card"
import Header from "@/components/Header"
import Wrapper from "@/components/Wrapper"

import iconPast from "@/assets/icons/cc-project.svg"
import CardProgress from "@/components/CardProgress"
import { PhaseContainer } from "./styles"

interface ControlCenterProps {
  params: { projectUuid: string }
}

const itens = [
  {
    percentComplete: 100,
    title: "Prepare",
    totalWork: 48,
    completeWork: 48
  },
  {
    percentComplete: 22,
    title: "Explore",
    totalWork: 122,
    completeWork: 27
  },
  {
    percentComplete: 22,
    title: "realize",
    totalWork: 122,
    completeWork: 27
  },
  {
    percentComplete: 22,
    title: "deploy",
    totalWork: 122,
    completeWork: 27
  },
  {
    percentComplete: 22,
    title: "run",
    totalWork: 122,
    completeWork: 27
  }

]

export default function ControlCenter({ params }: ControlCenterProps) {

  return (
    <BackgroundImg>
      <Header title="Control Center" text="Lunar Dynamics - Pré-projeto Browfield" />
      <Wrapper>
        <Card link={"home"} title="Projects" text="From clients list" icon={iconPast} />
      </Wrapper>
      <Wrapper>
        <PhaseContainer>
          {itens.map(item => (
            <CardProgress completeWork={item.completeWork} percentComplete={item.percentComplete} title={item.title} totalWork={item.totalWork} />
          ))}
        </PhaseContainer>
      </Wrapper>
    </BackgroundImg>
  )

}