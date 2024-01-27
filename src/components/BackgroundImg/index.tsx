import { ReactNode } from "react"
import { ContainerBg } from "./styles"

interface BackgroundImgProps {
  children: ReactNode
}

export default function BackgroundImg({ children }: BackgroundImgProps) {
  return (
    <ContainerBg>
      {children}
    </ContainerBg>
  )
}