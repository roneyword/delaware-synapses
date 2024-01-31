"use client"

import Loading from "@/components/Loading"
import StyledComponentsRegistry from "@/libs/registry"
import { Container } from "@/styles/container"
import GlobalStyle from "@/styles/globalStyle"
import { Suspense } from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <Container $isBackgroundImg={true}>
        <Suspense fallback={<Loading />}>
          {children}
        </ Suspense>
      </ Container>
    </StyledComponentsRegistry>
  )
}