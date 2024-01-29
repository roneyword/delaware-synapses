"use client";

import { useState } from "react";
import { HeaderAvatar, HeaderContainer } from "./styles";
import Image from "next/image";

import logo from "@/assets/imgs/delaware.png"
import iconUser from "@/assets/icons/icon-user.svg"
import logout from "@/assets/icons/logout.svg"
import { onMicrosoftLogout } from "@/app/api/auth";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title?: string,
  text?: string
}

export default function Header({ title, text }: HeaderProps) {
  const router = useRouter();

  const [isLogoutVisible, SetIslogoutVisible] = useState(false);

  const handleIsActiveLogout = () => {
    SetIslogoutVisible(!isLogoutVisible)
  }

  const handleLogout = async () => {
    const microsoftLoginUrl = await onMicrosoftLogout();
    router.push(microsoftLoginUrl);
  }

  return (
    <HeaderContainer>
      <figure className="header-logo">
        <Image src={logo} alt="logo marca" />
      </figure>

      <div className="header-content">
        {title && <h2>{title}</h2>}
        {text && <p>{text}</p>}
      </div>

      <HeaderAvatar $isVisible={isLogoutVisible}>
        <button onClick={handleIsActiveLogout} className="header-btn">
          <figure>
            <Image src={iconUser} alt="icone de usuario" />
          </figure>
        </button>

        <div className="header-popup">
          <button onClick={handleLogout}>
            <Image src={logout} alt="icone de logout" />
            Logout
          </button>
        </div>
      </HeaderAvatar>

    </HeaderContainer>
  )
}