import Image from "next/image"
import Link from "next/link"

import IconProject from "@/assets/icons/project.svg"
import { CardContainer } from "./styles"

interface CardProps {
  title: string,
  link: string
}

export default function Card({ title, link }: CardProps) {
  return (
    <Link href={link}>
      <CardContainer>
        <h2 className="card-title">{title}</h2>

        <figure>
          <Image src={IconProject} alt="icone de projetos" />
        </figure>
      </CardContainer>
    </Link>
  )
}