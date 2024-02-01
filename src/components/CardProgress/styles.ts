"use client";
import { keyframes, styled } from "styled-components";

interface CardProgressContainerProps {
  $percentComplete: number;
  $color: string;
  $bgColor: string;
  $link: string | null;
}

const fillAnimation = (percentComplete: number) => keyframes`
    0% {
      width: 0%;
    }
    100% {
      width: calc(${percentComplete}% - 4px) 
    }
`;

export const CardProgressContainer = styled.div<CardProgressContainerProps>`
  display: flex;
  flex-direction: column;
  flex: 1;

  .card-progress-title {
    font-weight: 700;
    font-size: 22px;
    padding-left: 0.5rem;
    margin-bottom: 5px;
    text-transform: uppercase;
    color: ${(props) => props.$color};
  }

  .card-progress {
    flex: 1;
    display: flex;
    gap: 0.75rem;
    background-color: ${(props) => props.$bgColor};
    border-radius: 0.75rem;
    padding: 1rem;
    cursor: ${props => props.$link ? "pointer" : "default"};

    .card-progress-icon {
      width: 68px;
      height: 68px;
    }

    .card-progress-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .card-progress-percent-complete {
        font-size: 1.125rem;
        color: white;
      }

      .card-progress-content {
        display: flex;
        flex-direction: column;

        .card-progress-work {
          display: flex;
          justify-content: space-between;

          .work-title{
            color: ${props => props.$color};
          }

          & > span {
            align-self: flex-end;
            margin-bottom: 10px;
            font-size: 0.875rem;
            color: white;

            &:nth-child(2){
              white-space: nowrap;
            }
          }
        }

        .card-progress-bar {
          position: relative;
          border-radius: 0.375rem;
          height: 1rem;
          width: 100%;
          background: white;

          &::after {
            position: absolute;
            top: 2px;
            left: 2px;
            content: "";
            height: calc(100% - 4px);
            background: ${(props) => props.$color};
            border-radius: 0.375rem;
            animation: ${(props) => fillAnimation(props.$percentComplete)} 0.8s
              ease both;
          }
        }
      }
    }
  }
`;
