"use client"

import { DropDownContainer } from "./styles";
import { ReactNode, useEffect, useRef, useState } from "react";
import { onGetColor } from "@/styles/color";

interface DropDownCards {
  title: string;
  projectName: string;
  children: ReactNode
  isDropDown: boolean
}

const iconArrow = (color: string) => (
  <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" overflow="hidden"><g transform="translate(-415 -110)"><path d="M431.823 113.82 424.5 125.18 417.177 113.82Z" fill={color} /></g></svg>
);

export function DropDownCards({ projectName, title, isDropDown, children }: DropDownCards) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpenDropDown = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <DropDownContainer $isOpen={isOpen} $color={onGetColor(projectName).color}>
      <div className="phases-dropdown-title">
        <button onClick={() => isOpenDropDown()}>
          <h2>{title}</h2>{isDropDown && iconArrow(onGetColor(projectName).color)}
        </button>
      </div>

      {isDropDown && <div className="dropdown">
        {children}
      </div>}
    </DropDownContainer>
  );
}
