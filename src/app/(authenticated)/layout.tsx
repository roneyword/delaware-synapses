"use client"

import StyledComponentsRegistry from "@/libs/registry"
import { Container } from "@/styles/container"
import GlobalStyle from "@/styles/globalStyle"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <Container $isBackgroundImg={true}>
            {children}
          </ Container>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}