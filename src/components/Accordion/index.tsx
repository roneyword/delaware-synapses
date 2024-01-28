"use client"

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import { AccordionContainer } from "./styles";
import Status from "../Status";

import iconBox from "@/assets/icons/project-box.svg"
import iconUsefullDoc from "@/assets/icons/useful-doc.svg"


interface ContentProps {
  title: string,
  status: number,
  responsibleName: string,
  plannedDate: string,
  executionDate: string,
  documentationUrl: string
}
interface AccordionProps {
  title: string,
  content: ContentProps[],
}

interface AccordionListProps {
  items: AccordionProps[];
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
                {item.content.map((doc, i) => (
                  <li key={i} className={i === activeItem ? "isActive" : ''} onClick={(event) => handleActiveDoc(event, i)}>
                    <div className="accordion-item-header">
                      <span>{doc.title}</span>
                      <Status status={1} />
                    </div>

                    <div className="accordion-item-doc">
                      <p>Responsible: <strong>{doc.responsibleName}</strong></p>
                      <p>Planned Date: <strong>{doc.plannedDate}</strong></p>
                      <p>Execultion Date: <strong>{doc.executionDate}</strong></p>

                      <Link href={doc.documentationUrl} target="_blank">
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