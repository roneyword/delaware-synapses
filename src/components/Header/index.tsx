"use client"

import { useState } from "react";
import { HeaderAvatar, HeaderContainer } from "./styles";
import Image from "next/image";

import logo from "@/assets/imgs/delaware.png"
import iconUser from "@/assets/icons/icon-user.svg"
import logout from "@/assets/icons/logout.svg"


interface HeaderProps {
  title?: string,
  text?: string
}

export default function Header({ title, text }: HeaderProps) {

  const [isLogoutVisible, SetIslogoutVisible] = useState(false);

  const handleIsActiveLogout = () => {
    SetIslogoutVisible(!isLogoutVisible)
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

      <HeaderAvatar isVisible={isLogoutVisible}>
        <button onClick={handleIsActiveLogout} className="header-btn">
          <figure>
            <Image src={iconUser} alt="icone de usuario" />
          </figure>
        </button>

        <div className="header-popup">
          <button>
            <Image src={logout} alt="icone de logout" />
            Logout
          </button>
        </div>
      </HeaderAvatar>

    </HeaderContainer>
  )
}