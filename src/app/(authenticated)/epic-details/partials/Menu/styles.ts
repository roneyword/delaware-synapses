"use client"
import { styled } from "styled-components";

export const MenuDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  margin-bottom: 30px;

  .header-wrapper{
    height: 250px;

    &.main{
      flex: 1;
    }

    .phases-container{
      display: flex;
      gap: 30px;
      height: 100%;

      .phases-container-item{
        position: relative;
        width: 100%;
      }
    }
  }
`;