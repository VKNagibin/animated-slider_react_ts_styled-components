import styled, {keyframes} from "styled-components";
import {ISliderProps} from "./types";

const ComponentContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const SliderContainer = styled.div`
  border-radius: 10px;
  outline: 4px solid rgba(21, 21, 21, 0.83);
  box-sizing: content-box;
  width: ${((props: ISliderProps) => props.width)}px;
  position: relative;
  display: flex;
  justify-content: ${((props: ISliderProps) => props.justifyContent)};
  height: ${((props: ISliderProps) => props.height)}px;
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
  height: 100%;
  display: flex;
  animation-duration: .5s;
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
  display: flex;
  justify-content: center;
  gap: 10px;
`

export {
    ComponentContainer,
    SliderContainer,
    SlidesContainer,
    SlideCount,
    TextElement,
    PaginationContainer,
}