"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { onGenerateAccesTokenByCode } from "../api/auth";
import { useEffect } from "react";

export default function App() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleGenerateToken = async () => {
    if (searchParams.has("code")) {
      if (!window || !window?.location) return;

      const code = searchParams.get("code");
      await onGenerateAccesTokenByCode(code!);

      return router.push("/home");
    }
  }

  useEffect(() => {
    (async () => await handleGenerateToken())();
  }, [searchParams, router]);

  return router.replace(`/login`);
}
