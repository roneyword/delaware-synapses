"use client";

import Image from "next/image";
import { Container } from "./styles";
import logo from "@/assets/imgs/delaware.png"
import { useRouter } from "next/navigation";
import { onMicrosoftSignIn } from "@/actions/auth";

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    const microsoftLoginUrl = await onMicrosoftSignIn();
    router.push(microsoftLoginUrl);
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
