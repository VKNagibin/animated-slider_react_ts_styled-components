import styled, { keyframes } from "styled-components";
import { ISliderProps } from "./types";

const ComponentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`

const SliderContainer = styled.div`
  flex-basis: 90%;
  width: 100%;
  border-radius: 5px;
  outline: 4px solid rgba(21, 21, 21, 0.83);
  box-sizing: content-box;
  position: relative;
  flex-direction: column;
  display: flex;
  align-items: ${((props: ISliderProps) => props.justifyContent)};
  overflow: hidden;
`


const animLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(50%);
  }
`

const animRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`

const SlidesContainer = styled.div`
  width: 200%;
  height: 100%;
  display: flex;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
 
  
  &.Left {
    animation-name: ${animLeft};
  }
  
  &.Right {
    animation-name: ${animRight};
  }
`

const SlideCount = styled.div`
  font-size: 1.5rem;
  text-align: center;
  position: absolute;
  top: 10px;
  left: 10px;
  color: rgb(197, 220, 220);
  background: rgba(0, 0, 0, 0.8);
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 10;
`

const TextElement = styled.h2`
  font-family: sans-serif;
  color: blanchedalmond;
  position: absolute;
  bottom: 20px;
  right: 50%;
  transform: translateX(50%);
`

const PaginationContainer = styled.div`
  width: 90%;
  flex-basis: 10%;
  overflow: auto;
  display: flex;
  justify-content: center;
  gap: 20px;
`

export {
    ComponentContainer,
    SliderContainer,
    SlidesContainer,
    SlideCount,
    TextElement,
    PaginationContainer,
}