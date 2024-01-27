import { ReactNode } from "react"
import { WrapperContainer } from "./stylers"

interface WrapperProps {
  children: ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <WrapperContainer>
      {children}
    </WrapperContainer>
  )
}
