import Image from "next/image"
import Link from "next/link"

import IconProject from "@/assets/icons/project.svg"
import { CardContainer } from "./styles"

interface CardProps {
  title: string,
  text?: string,
  link: string
  icon?: string
}

export default function Card({ title, link, text, icon }: CardProps) {
  return (
    <Link href={link}>
      <CardContainer>
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          {text && <p className="card-text">{text}</p>}
        </div>


        <figure>
          <Image src={icon ? icon : IconProject} alt="icone de projetos" />
        </figure>
      </CardContainer>
    </Link>
  )
}