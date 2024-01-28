"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function App() {
  const searchParams = useSearchParams();
  const router = useRouter();

  if (searchParams.get("code")) {
    router.replace("/login");
  }

  return <></>;
}
