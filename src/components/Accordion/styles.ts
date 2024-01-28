"use client"
import { styled } from "styled-components";

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.19rem;

  .accordion-list {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;

    li {
      position: relative;
      margin-bottom: 0.3rem;

      &:last-child {
        margin-bottom: 0rem;
      }

      &.isActive {
        .acordionContent {
          max-height: 1000px;
          padding: 0.88rem 2.25rem;
          transition: max-height 0.3s linear;
        }
      }

      .accordionHeader {
        display: flex;
        align-items: center;
        gap: 10px;
        padding-bottom: 5px;
        border-bottom: 2px solid #393939;
        cursor: pointer;


        & > h3 {
          font-size: 16px;
          color: #393939;
          font-weight: 700;
        }
      }

      .acordionContent {
        max-height: 0px;
        overflow: hidden;

        .accordion-items{
          list-style: none;
          padding: 0;
          margin: 0;
        }
      }
    }
  }
`;