import React, {useEffect, useState} from 'react';
import { IProps, INextSlideData, AnimationType, FlexJustifyType, Slide, DirectionType } from "./types";
import ControlButton from "../ControlButton";
import SliderImage from "../SliderImage";
import PaginationButton from "../PaginationButton";
import { nanoid } from "nanoid";

import {
    ComponentContainer,
    SliderContainer,
    SlidesContainer,
    SlideCount,
    TextElement,
    PaginationContainer,
} from "./styled"

function Slides(props: IProps) {
    const [ timer, setTimer ] = useState<any>(0);
    const [ curIndex, setCurIndex ] = useState<number>(0);
    const [ gen ] = useState<any>(generator());
    const [ animation, setAnimationDirection ] = useState<AnimationType>("");
    const [ status, setStatus ] = useState<string>("end");
    const [ justifyContent, setJustifyContent ] = useState<FlexJustifyType>("");
    const [ imagesArray, setImagesArray ] = useState<string[]>([props.slides[0].img]);

    // useEffect(() => {
    //     setTimer(
    //         setTimeout(() => {
    //             activateSlider("Right", curIndex + 1);
    //         }, 300)
    //     );
    //
    //     return clearTimeout(timer);
    // }, [curIndex]);

    const prepareSlides = ({ direction, nextIndex }: INextSlideData) => {
        if (direction === "Right") {
            setJustifyContent("flex-start");
            setImagesArray(array => [...array, props.slides[nextIndex].img]);
            return
        }
        setJustifyContent("flex-end");
        setImagesArray(array => [props.slides[nextIndex].img, ...array]);
        return
    }

    const loopHandler = (index: number) => {
        if (!props.loop) {
            return NaN;
        }

        return index;
    }

    const validateIndex = (index: number) => {
        if (index < 0) return loopHandler(props.slides.length - 1);
        if (index > props.slides.length - 1) return loopHandler(0);

        return index;
    }

    const getNextIndex = (index: number) => {
        return validateIndex(index);
    }

    function* generator() {
        while(true) {
            const data: INextSlideData = yield;
            yield prepareSlides(data);
            yield startAnimation(data);
            yield clearContainer(data);
        }
    }

    const activateSlider = (direction: DirectionType, index: number) => {
        if (status !== "end") return
        if (direction === "don't move") return

        const nextIndex = getNextIndex(index);

        if ( isNaN(nextIndex) ) return

        setStatus("pending");

        gen.next();
        gen.next({
            direction,
            nextIndex
        });
        gen.next();
    }

    const startAnimation = ({ direction }: INextSlideData ) => {
        setAnimationDirection(direction);
    }

    const animationIsFinished = () => {
        gen.next();
        setStatus("end");
    }

    const clearContainer = ({direction, nextIndex}: INextSlideData) => {
        setImagesArray((prev) => {
            return editedArray(direction, prev);
        });

        setCurIndex(validateIndex(nextIndex));

        setJustifyContent("");
        setAnimationDirection("");
    }

    const editedArray = (direction: DirectionType, array: string[]) => {
        let newArray = array.slice();
        if (direction === "Left") {
            newArray.pop();
        } else {
            newArray.shift();
        }

        return newArray
    }

    return (
        <ComponentContainer>
            <SliderContainer width={props.width}
                             height={props.height}
                             justifyContent={justifyContent}>
                {
                    props.navs &&
                    (
                        <>
                            <ControlButton index={curIndex - 1} direction="Left" changeSlide={activateSlider}/>
                            <ControlButton index={curIndex + 1} direction="Right" changeSlide={activateSlider}/>
                        </>
                    )
                }
                <SlideCount>
                    { `${curIndex + 1} / ${props.slides.length}` }
                </SlideCount>
                <SlidesContainer onAnimationEnd={animationIsFinished} className={animation}>
                    {
                        imagesArray.map(item => (<SliderImage height={props.height} width={props.width} src={item} key={nanoid()}/>))
                    }
                </SlidesContainer>
                <TextElement>
                    {props.slides[curIndex].text}
                </TextElement>

            </SliderContainer>
            {
                props.pags &&
                (
                    <PaginationContainer>
                        {
                            props.slides.map((item: Slide, index: number): JSX.Element => (
                                <PaginationButton curSlide={curIndex} index={index} changeSlide={activateSlider} key={nanoid()}/>))
                        }
                    </PaginationContainer>
                )
            }
        </ComponentContainer>
    );
}

export default Slides;