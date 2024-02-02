"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { onGenerateAccessTokenByCode } from "@/actions/auth";

export default function App() {
  const router = useRouter();
  const params = useSearchParams();

  const onLoad = async () => {
    const code = params.get("code");
    if (code) {
      onGenerateAccessTokenByCode(code).then(() => {
        router.push(`/home`);
      });
    };

    router.push(`/login`);
  };

  useEffect(() => {
    (async() => await onLoad())();
  }, [router]);
}
