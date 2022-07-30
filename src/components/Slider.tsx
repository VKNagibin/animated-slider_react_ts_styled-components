import React, { useState, useEffect } from 'react';
import styled, { keyframes } from "styled-components"
import { nanoid } from "nanoid";

import {Slide, SlidesContainerProps, IProps} from "../sliderTypes";
import ControlButton from "./ControlButton";
import PaginationButton from "./PaginationButton";

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
  border-radius: 5px;
  width: 600px;
  position: relative;
  display: flex;
  height: 400px;
  overflow: hidden;
`

const animLeft = keyframes`
  from {
    transform: translateX(-600px);
  }
  to {
    transform: translateX(0);
  }
`

const animRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-600px);
  }
`

const SlidesContainer = styled.div`
  width: 1800px;
  height: 400px;
  justify-content: center;
  display: flex;
  transform: translateX(${(props: SlidesContainerProps) => props.translation}px);
  
  &.animLeft {
    animation-name: ${animLeft};
    animation-duration: .5s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
  
  &.animRight {
    animation-name: ${animRight};
    animation-duration: .5s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
`

const Image = styled.img`
  display: block;
  width: 600px;
  height: 400px;
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

function Slides(props: IProps) {
    const { auto = false } = props;
    const [prevCall, setPrevCall] = useState<number>(Date.now());
    const [slide, setSlide] = useState<Slide>(props.slides[0]);
    const [nextSlide, setNextSlide] = useState<Slide>(props.slides[1]);
    const [curIndex, setCurIndex] = useState<number>(0);
    const [translation, setTranslation] = useState<number>(0);
    const [left, setLeft] = useState<boolean>(false);
    const [right, setRight] = useState<boolean>(false);
    const [isAuto, setIsAuto] = useState<boolean>(auto);

    let timer: any = 0;

    const delayParser = () => {
        if (props.delay !== 0 && !props.delay) {
            return 5000;
        }
        if (props.delay < 0.8) {
            return (props.delay + 1) * 800;
        } else {
            return props.delay * 1000;
        }
    }

    useEffect(() => {
        if (isAuto) {
            timer = setTimeout(() => {
                rightArrowHandler();
            }, delayParser());
        }
        return function() {
            clearTimeout(timer);
        }
    });

    const controlBtnHandler = (side: string) => {
        if (side === "left") {
            return leftArrowHandler();
        }
        return rightArrowHandler();
    }

    const handleLeftMove = (slide: Slide, nextSlide: number) => {
        setNextSlide(slide);
        setTranslation(-600);
        setLeft(true);
        setPrevCall(Date.now());
        setSlide(props.slides[nextSlide]);

        setTimeout(() => {
            if (nextSlide === props.slides.length - 1) {
                setNextSlide(props.slides[0]);
            } else {
                setNextSlide(props.slides[nextSlide + 1]);
            }
            setLeft(false);
            setTranslation(0);
            setCurIndex(nextSlide);
        },600)
    }

    const handlePaginationBtn = (index: number): void => {
        if (index === curIndex) {
            return
        }
        const curSlideIndex: number =  props.slides.findIndex(item => item.index === index);

        if (index < curIndex) {
            handleLeftMove(slide, curSlideIndex);
        } else {
            handleRightMove(curSlideIndex);
        }
    }

    const rightArrowHandler = () => {
        if ((Date.now() - prevCall) > 800) {
            let curSlideIndex = props.slides.findIndex(item => item.id === slide.id);
            if (curSlideIndex === props.slides.length - 1) {
                curSlideIndex = -1;
            }

            if (!props.loop && curSlideIndex === -1) {
                return
            }

            setRight(true);
            setPrevCall(Date.now());

            setTimeout(() => {
                setSlide(props.slides[curSlideIndex + 1]);
                if (curSlideIndex === props.slides.length - 2) {
                    setNextSlide(props.slides[0]);
                } else {
                    setNextSlide(props.slides[curSlideIndex + 2]);
                }
                setCurIndex(nextSlide.index);
                setRight(false);
                setTranslation(0);
            }, 600)
        }
    }

    const leftArrowHandler = () => {
        if ((Date.now() - prevCall) > 800) {
            let curSlideIndex = props.slides.findIndex(item => item.id === slide.id);
            if (!props.loop && !curSlideIndex) {
                return;
            }
            if (props.loop && !curSlideIndex) {
                curSlideIndex = props.slides.length;
            }

            handleLeftMove(slide, curSlideIndex - 1);
            }
    }


    const handleRightMove = (nextSlide: number) => {
        setNextSlide(props.slides[nextSlide]);
        setRight(true);
        setPrevCall(Date.now());

        setTimeout(() => {
            setSlide(props.slides[nextSlide]);
            if (nextSlide < props.slides.length - 1) {
                setNextSlide(props.slides[nextSlide + 1]);
            } else {
                setNextSlide(props.slides[0]);
            }
            setCurIndex(nextSlide);
            setRight(false);
            setTranslation(0);
        }, 600)
    }

    const handleMouseEnter = () => {
        if (props.auto && props.stopMouseHover) {
            setIsAuto(false);
            timer && clearTimeout(timer);

        }
    }
    const handleMouseLeave = () => {
        if (props.auto && props.stopMouseHover) {
            setIsAuto(true);
        }
    }

    return (
        <ComponentContainer>
            {/*<Switch />*/}
            <SliderContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {
                    props.navs &&
                    (
                        <>
                            <ControlButton side="left" controlBtnHandler={controlBtnHandler}/>
                            <ControlButton side="right" controlBtnHandler={controlBtnHandler}/>
                        </>
                    )
                }

                <SlideCount>
                    {`${curIndex + 1} / ${props.slides.length}`}
                </SlideCount>
                <SlidesContainer className={left ? "animLeft" : right ? "animRight" : ""} translation={translation} >
                    <Image src={slide.img}/>
                    <Image src={nextSlide.img}/>
                </SlidesContainer>
                <TextElement>
                    {props.slides[curIndex].text}
                </TextElement>

            </SliderContainer>
            {
                props.pags &&
                (
                    <PaginationContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        {
                            props.slides.map((item: Slide, index: number):JSX.Element => (
                                <PaginationButton key={nanoid()} handlePaginationBtn={handlePaginationBtn} index={index} curSlide={curIndex} />))
                        }
                    </PaginationContainer>
                )
            }
        </ComponentContainer>
    );
}

export default Slides;