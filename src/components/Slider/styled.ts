import styled, { keyframes } from 'styled-components'
import { SlidesContainerProps } from '../../sliderTypes'

export const StyledComponentContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

export const StyledSliderContainer = styled.div`
    border-radius: 5px;
    width: 600px;
    position: relative;
    display: flex;
    height: 400px;
    overflow: hidden;
`

const leftMoveKeyframes = keyframes`
  from {
    transform: translateX(-600px);
  }
  to {
    transform: translateX(0);
  }
`

const rightMoveKeyframes = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-600px);
  }
`

export const StyledSlidesContainer = styled.div<SlidesContainerProps>`
    width: 1800px;
    height: 400px;
    justify-content: center;
    display: flex;
    transform: translateX(${({ translation }) => translation}px);

    animation-duration: 0.5s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;

    &.animLeft {
        animation-name: ${leftMoveKeyframes};
    }

    &.animRight {
        animation-name: ${rightMoveKeyframes};
    }
`

export const StyledImage = styled.img`
    display: block;
    width: 600px;
    height: 400px;
`

export const StyledSlidesCount = styled.div`
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

export const StyledDescription = styled.h2`
    font-family: sans-serif;
    color: blanchedalmond;
    position: absolute;
    bottom: 20px;
    right: 50%;
    transform: translateX(50%);
`

export const StyledPaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`
