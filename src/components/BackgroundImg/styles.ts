"use client"
import imagebg from "@/assets/imgs/delaware-bg.png";
import { styled } from "styled-components";

export const ContainerBg = styled.figure`
  width: 100%;
  height: 100vh;
  padding: 20px;
  background-image: url(${imagebg.src});
  background-size: cover;
  z-index: -1;
`;
