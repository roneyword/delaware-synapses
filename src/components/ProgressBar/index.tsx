import Image from "next/image";
import iconCrow from "@/assets/icons/crown.svg"

import { ProgressBarContainer } from "./styles";

export default function ProgressBar() {
  return (
    <ProgressBarContainer>
      <div className="progress-bar-step">
        <span>10</span>
      </div>

      <div className="progress-bar-content">
        <div className="progress-bar">
          <div className="progress-bar-name">
            <figure>
              <Image src={iconCrow} alt="icone de uma coroa" />
            </figure>
            <span>Prepare</span>
          </div>

          <time>22/04/1989</time>

        </div>

        <div className="progress-bar-work">
          <span>48 of 48</span>
          <span>100%</span>
        </div>
      </div>
    </ProgressBarContainer>
  )
}