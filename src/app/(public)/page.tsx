"use client";

import { useEffect } from "react";
import { onGenerateAccessTokenByCode } from "../api/auth";
import { useSearchParams, useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
  if (code) {
    try {
      onGenerateAccessTokenByCode(code as string);
      router.push("/home");
    } catch (error) {
      console.error('Error during login initiation:', error);
    }
  }
}, [router]);
}
