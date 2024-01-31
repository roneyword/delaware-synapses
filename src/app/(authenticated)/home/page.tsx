import Card from "@/components/Card";
import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";

const itens = [
  {
    isActive: true,
    name: "Pré-projeto Browfield",
    projectId: 1,
    projectUuid: "95c97e4c-a32e-4917-b2c1-b828b35e9821",
  },
  {
    isActive: true,
    name: "Projeto S/4MOVE",
    projectId: 1,
    projectUuid: "95c97e4c-a32e-4917-b2c1-b828b35e9821",
  },
  {
    isActive: true,
    name: "Projeto Calix",
    projectId: 1,
    projectUuid: "95c97e4c-a32e-4917-b2c1-b828b35e9821",
  },

]

export default function Home() {
  return (
    <>
      <Header />
      <Wrapper>
        {itens.map(project => (
          <Card key={project.projectUuid} link={`/control-center/${project.projectUuid}`} title={project.name} />
        ))}
      </Wrapper>
    </>
  );
}
