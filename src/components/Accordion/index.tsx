"use client"

import { useState } from "react";
import { AccordionContainer } from "./styles";

import iconBox from "@/assets/icons/project-box.svg"
import Image from "next/image";
import Status from "../Status";

interface AccordionProps {
  title: string,
  description: string,
}

interface AccordionListProps {
  items: AccordionProps[];
}

export default function Accordion({ items }: AccordionListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <AccordionContainer>
      <ul className="accordion-list">
        {items.map((item, index) => (
          <li key={index} className={index === activeIndex ? "isActive" : ''} onClick={() => handleClick(index)}>
            <div className="accordionHeader">
              <figure><Image src={iconBox} alt="icone de uma caixa" /></figure>

              <h3>{item.title}</h3>

              <Status status={1} />
            </div>

            <div className="acordionContent">
              <ul className="accordion-items">
                <li>teste</li>
                <li>teste</li>
                <li>teste</li>
                <li>teste</li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </AccordionContainer>
  )
}