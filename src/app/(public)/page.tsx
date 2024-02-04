"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const handleLogin = async () => {
    const { data } = await fetch(`/api/auth/sign-in`, {
      method: "POST",
      body: JSON.stringify({code})
    }).then((res) => res.json());

    if (data?.accessToken) {
      router.push("/home");
    }
  };

  useEffect (() => {
    if (code) {
      handleLogin();
    }

    router.push(`/login`);
  }, [code]);
}
