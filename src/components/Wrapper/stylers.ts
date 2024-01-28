"use client"
import { styled } from "styled-components";

export const WrapperContainer = styled.div`
  max-height: calc(100% - 85px);
  width: 100%;
  overflow-y: auto;
  border: 2px solid #7f7f7f;
  border-radius: 0.75rem;
  padding: 18px;
  margin-top: 14px;
  background-color: #f2f2f2;

  .wrapper-title{
    font-size: 22px;
    color: #727272;
    margin-bottom: 10px;
  }
`;
