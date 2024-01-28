"use client"
import { styled } from "styled-components";

export const ProgressBarContainer = styled.div`
 width: 100%;
 max-width: 350px;
 display: flex;
 align-items: center;

 .progress-bar-step{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  border: 2px solid white;
  border-radius: 50%;
  background: red;
  z-index: 2;

  & > span{
    font-size: 1.25rem;
    color: white;
  }
 }

 .progress-bar-content{
  display: flex;
  flex-direction: column;
  flex: 1;

  .progress-bar{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 35px;
  margin-left: -25px;
  margin-top: 15px;
  padding: 0 10px 0 30px;
  border-radius: 0.5rem;
  background: #a6a6a6;
  border: 1px solid green;

  &::after{
    content: "";
    position: absolute;
    top: 0;
    left: 20px;
    width: calc(100% - 20px);
    height: 100%;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background: red;
  }

  .progress-bar-name{
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
    z-index: 10;

    & > span{
      font-size: 14px;
      color: white;
    }

  }

  time{
    position: relative;
    font-size: 16px;
    color: white;
    z-index: 10;
  }
  }

  .progress-bar-work{
    align-content: flex-end;
  }
 }
`;
