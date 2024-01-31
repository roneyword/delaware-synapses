"use client"

import Loading from "@/components/Loading"
import { TextHeaderProvider } from "@/hooks/useContextHeader"
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
          <TextHeaderProvider>
            {children}
          </ TextHeaderProvider>
        </Suspense>
      </ Container>
    </StyledComponentsRegistry>
  )
}