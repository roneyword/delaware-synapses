"use client"

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import { AccordionContainer } from "./styles";
import Status from "../Status";

import iconBox from "@/assets/icons/project-box.svg"
import iconUsefullDoc from "@/assets/icons/useful-doc.svg"


interface ContentProps {
  name: "string",
  isAutomated: boolean,
  status: {
    id: 1 | 2 | 3 | 4
    name: string
  },
  taskId: number,
  userStoryId: number,
  almId: string,
  pbiStatusId: number,
  automationId: number,
  title: string,
  step: number,
  responsibleName: string,
  plannedDate: string,
  executionDate: string,
  documentationUrl: string,
  evidenceUrl: string,
  createAt: string,
  createdBy: string | null,
  updateAt: string | null,
  updatedBy: string | null
}
interface AccordionProps {
  title: string,
  content: ContentProps[],
}

interface AccordionListProps {
  items: AccordionProps[];
  status: number,
}

export default function Accordion({ items }: AccordionListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleActiveDoc = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    setActiveItem(index === activeItem ? null : index);
  };

  return (
    <AccordionContainer>
      <ul className="accordion-list">
        {items.map((item, index) => (
          <li key={index} className={index === activeIndex ? "isActive" : ''} onClick={() => handleClick(index)}>
            <div className="accordion-header">
              <div className="accordion-header-title">
                <figure><Image src={iconBox} alt="icone de uma caixa" /></figure>

                <h3>{item.title}</h3>
              </div>

              <Status status={1} />
            </div>

            <div className="acordion-content">
              <ul className="accordion-items">
                {item.content.map((task, i) => (
                  <li key={i} className={i === activeItem ? "isActive" : ''} onClick={(event) => handleActiveDoc(event, i)}>
                    <div className="accordion-item-header">
                      <span>{task.title}</span>
                      <Status status={2} />
                    </div>

                    <div className="accordion-item-doc">
                      <p>Responsible: <strong>{task.responsibleName}</strong></p>
                      <p>Planned Date: <strong>{task.plannedDate}</strong></p>
                      <p>Execultion Date: <strong>{task.executionDate}</strong></p>

                      <Link href={task.documentationUrl ? task.documentationUrl : ""} target="_blank">
                        <Image src={iconUsefullDoc} alt="icone de uma livro" />
                        UseFul Document
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </AccordionContainer>
  )
}