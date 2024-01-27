import Image from "next/image";
import { Container } from "./styles";
import logo from "@/assets/delaware.png"

export default function Login() {
  return (
    <Container>
      <figure className="logo">
        <Image src={logo} alt="logo marca" />
      </figure>
      <div className="login">
        <h1 className="login-title">Welcome to delaware Synapses</h1>
        <button className="login-btn">Login</button>
      </div>
    </Container>
  );
}
