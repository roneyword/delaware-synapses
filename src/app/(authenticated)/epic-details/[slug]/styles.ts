"use client"
import { styled } from "styled-components";

export const HeaderDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
`;

export const DetailsLegendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  .details-legend-list{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;

    & > li{
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;


      & > figure{
        width: 25px;
        height: 25px;

        & > img{
          width: 100%;
          height: auto;
        }
      }

      &:last-child{
        margin-bottom: 0px;
      }
    }
  }
`;

export const DetailsContentContainer = styled.div`
  display: flex;
  gap: 20px;
 
  .card-details{
    gap: 20px;
    width: 100%;
    padding: 1rem;
    background: white;
    border-radius: 0.5rem 
  }
`;



