"use client"

import Image from "next/image";
import { Container } from "./styles";
import logo from "@/assets/imgs/delaware.png";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    const {data} = await fetch("/api/auth/sign-in").then((res) => res.json());
    router.push(data);
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
