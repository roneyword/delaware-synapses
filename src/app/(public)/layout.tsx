"use client"

import Loading from "@/components/Loading"
import { Container } from "@/styles/container"
import { Suspense } from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container $isBackgroundImg={true}>
      {children}
    </ Container>
  )
}