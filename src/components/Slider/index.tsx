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

let timerId: any;

function Slides(props: IProps) {
    const [ rejectAutoChange, setAutoChange ] = useState<boolean>(false);
    const [ currentIndex, setCurrentIndex ] = useState<number>(0);
    const [ generatorInstance ] = useState<any>(generator());
    const [ animation, setAnimationDirection ] = useState<AnimationType>("");
    const [ status, setStatus ] = useState<string>("end");
    const [ justifyContent, setJustifyContent ] = useState<FlexJustifyType>("");
    const [ imagesArray, setImagesArray ] = useState<string[]>([props.slides[0].img]);

    useEffect(() => {
        if (!rejectAutoChange && props.auto) {
            timerId = setTimeout(() => {
                activateSlider("Right", currentIndex + 1);
            }, setDelay());
        }

        return function() {
            clearTimeout(timerId);
        }
    }, [currentIndex]);

    function* generator() {
        while(true) {
            const data: INextSlideData = yield;
            yield prepareSlides(data);
            yield startAnimation(data);
            yield clearContainer(data);
        }
    }

    const activateSlider = (direction: DirectionType, index: number, source?: string) => {
        if (status !== "end") return
        if (direction === "don't move") return

        preventAuto(source ? source : null);

        const nextIndex = validateIndex(index);

        if ( isNaN(nextIndex) ) return

        setStatus("pending");

        generatorInstance.next();
        generatorInstance.next({
            direction,
            nextIndex
        });
        generatorInstance.next();
    };

    const setDelay = () => {
        return props.delay ? props.delay * 1000 : 5000;
    }

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

    const preventAuto = (source: string | null) => {
        if (!source) return

        setAutoChange(true);
        clearTimeout(timerId);
    }

    const startAnimation = ({ direction }: INextSlideData ) => {
        setAnimationDirection(direction);
    }

    const animationEnd = () => {
        generatorInstance.next();
        setStatus("end");
    }

    const clearContainer = ({ direction, nextIndex }: INextSlideData) => {
        setImagesArray((prev) => {
            return editedArray(direction, prev);
        });

        setCurrentIndex(validateIndex(nextIndex));

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

    const stopOnMouseOver = () => {
        if (!props.stopMouseHover) return
        if (!props.auto) return

        setAutoChange(true);
        clearTimeout(timerId);
    }

    const startOnMouseLeave = () => {
        if (!props.stopMouseHover) return
        if (!props.auto) return

        setAutoChange(false);
        timerId = setTimeout(() => {
            activateSlider("Right", currentIndex + 1);
        }, setDelay());
    }

    return (
        <ComponentContainer onMouseEnter={stopOnMouseOver}
                            onMouseLeave={startOnMouseLeave}>

            <SliderContainer justifyContent={justifyContent}>
                {
                    props.navs &&
                    (<>
                        <ControlButton index={currentIndex - 1}
                                       direction="Left"
                                       source="userClick"
                                       changeSlide={activateSlider}/>
                        <ControlButton index={currentIndex + 1}
                                       direction="Right"
                                       source="userClick"
                                       changeSlide={activateSlider}/>
                    </>)
                }
                <SlideCount>
                    { `${currentIndex + 1} / ${props.slides.length}` }
                </SlideCount>
                <SlidesContainer onAnimationEnd={animationEnd}
                                 className={animation}>
                    {
                        imagesArray.map(item => (
                            <SliderImage src={item}
                                         key={nanoid()}
                            />))
                    }
                </SlidesContainer>
                <TextElement>
                    {props.slides[currentIndex].text}
                </TextElement>

            </SliderContainer>
            {
                props.pags &&
                (<PaginationContainer>
                    {
                        props.slides.map((item: Slide, index: number): JSX.Element => (
                            <PaginationButton curSlide={currentIndex}
                                              index={index}
                                              source="userClick"
                                              changeSlide={activateSlider}
                                              key={nanoid()} />))
                    }
                </PaginationContainer>)
            }
        </ComponentContainer>
    );
}

export default Slides;