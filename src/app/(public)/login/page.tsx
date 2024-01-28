"use client";

import Image from "next/image";
import { Container } from "./styles";
import logo from "@/assets/imgs/delaware.png"
import { onMicrosoftSignIn } from "@/app/api/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    if (!window) return;

    const microsoftLoginUrl = await onMicrosoftSignIn(window.location.origin);
    router.replace(microsoftLoginUrl);
  }

  return (
    <Container>
      <figure className="logo">
        <Image src={logo} alt="logo marca" />
      </figure>
      <div className="login">
        <h1 className="login-title">Welcome to delaware Synapses</h1>
        <button className="login-btn" onClick={handleLogin}>Login</button>
      </div>
    </Container>
  );
}
