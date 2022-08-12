import React, { useState } from 'react';
import { IProps, INextSlideData, AnimationType, FlexJustifyType, Slide } from "./types";
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
    const [curIndex, setCurIndex] = useState<number>(0);
    const [gen] = useState<any>(generator());
    const [ animation, setAnimationDirection ] = useState<AnimationType>("");
    const [ status, setStatus ] = useState<string>("end");
    const [ justifyContent, setJustifyContent ] = useState<FlexJustifyType>("");
    const [ imagesArray, setImagesArray ] = useState<string[]>([props.slides[0].img]);


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

    const validateIndex = (index: number) => {
        if (index < 0) return props.slides.length - 1;
        if (index > props.slides.length - 1) return 0

        return index;
    }

    const getNextIndex = (source: string, index?: number) => {
        if (source === "leftControl") return validateIndex(curIndex - 1);
        if (source === "rightControl") return validateIndex(curIndex + 1);
        if (source === "pagination" && index !== undefined) return validateIndex(index);
    }

    function* generator() {
        while(true) {
            const data: INextSlideData = yield;
            yield prepareSlides(data);
            yield startAnimation(data);
            yield clearContainer(data);
        }
    }

    const activateSlider = (direction: "Left" | "Right" | null, source: string, index?: number) => {
        if (status !== "end") return
        if (!direction) return

        setStatus("pending");

        const nextIndex = getNextIndex(source, index);

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

    const editedArray = (direction: "Left" | "Right", array: string[]) => {
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
                            <ControlButton source={"leftControl"} direction="Left" changeSlide={activateSlider}/>
                            <ControlButton source={"rightControl"} direction="Right" changeSlide={activateSlider}/>
                        </>
                    )
                }
                <SlideCount>
                    { `${curIndex + 1} / ${props.slides.length}` }
                </SlideCount>
                <SlidesContainer onAnimationEnd={animationIsFinished} className={animation}>
                    {
                        imagesArray.map((item, index) => (<SliderImage height={props.height} width={props.width} src={item} key={nanoid()}/>))
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
                                <PaginationButton curSlide={curIndex} index={index} source={"pagination"} changeSlide={activateSlider} key={nanoid()}/>))
                        }
                    </PaginationContainer>
                )
            }
        </ComponentContainer>
    );
}

export default Slides;