import { useEffect, useRef, useState } from 'react'

import { SlideType, InitialSlideType } from '@/types'

import useSlides from './useSlides'

interface HookInterface {
    slides: InitialSlideType[]
    stopOnMouseOver: boolean
    delay: number
    auto: boolean
    loop: boolean
}

const leftDirectionAnimationName = 'leftDirection'
const rightDirectionAnimationName = 'rightDirection'
const noAnimationString = ''

export default function useSliderLogic({ slides, auto, delay, loop, stopOnMouseOver }: HookInterface) {
    const [index, setIndex] = useState<number>(0)
    const [animationName, setAnimationName] = useState(noAnimationString)
    const [isAuto, setIsAuto] = useState<boolean>(auto)
    const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout>>()

    const animationRef = useRef<HTMLDivElement>(null)

    const { nextSlide, slide, preparedSlides, setSlide, setNextSlide } = useSlides(slides)

    const handleLeftMove = (slide: SlideType, nextSlide: number) => {
        setNextSlide(slide)
        setAnimationName(leftDirectionAnimationName)
        setSlide(preparedSlides[nextSlide])

        if (!animationRef.current) return
        animationRef.current.addEventListener(
            'animationend',
            () => {
                if (nextSlide === preparedSlides.length - 1) {
                    setNextSlide(preparedSlides[0])
                } else {
                    setNextSlide(preparedSlides[nextSlide + 1])
                }
                setAnimationName(noAnimationString)
                setIndex(nextSlide)
            },
            { once: true }
        )
    }

    const handleRightMove = (nextSlide: number) => {
        setNextSlide(preparedSlides[nextSlide])
        setAnimationName(rightDirectionAnimationName)

        if (!animationRef.current) return
        animationRef.current.addEventListener(
            'animationend',
            () => {
                setSlide(preparedSlides[nextSlide])
                if (nextSlide < preparedSlides.length - 1) {
                    setNextSlide(preparedSlides[nextSlide + 1])
                } else {
                    setNextSlide(preparedSlides[0])
                }
                setIndex(nextSlide)
                setAnimationName(noAnimationString)
            },
            { once: true }
        )
    }

    const handleMouseEnter = () => {
        if (auto && stopOnMouseOver) {
            setIsAuto(false)
            timerId && clearTimeout(timerId)
        }
    }
    const handleMouseLeave = () => {
        if (auto && stopOnMouseOver) {
            setIsAuto(true)
        }
    }

    const rightArrowHandler = () => {
        let curSlideIndex = preparedSlides.findIndex((item) => item.id === slide.id)
        if (curSlideIndex === preparedSlides.length - 1) {
            curSlideIndex = -1
        }

        if (!loop && curSlideIndex === -1) {
            return
        }

        if (curSlideIndex === preparedSlides.length - 2) {
            setNextSlide(preparedSlides[0])
        } else {
            setNextSlide(preparedSlides[curSlideIndex + 2])
        }
        setSlide(preparedSlides[curSlideIndex + 1])

        setAnimationName(rightDirectionAnimationName)

        if (!animationRef.current) return
        animationRef.current.addEventListener(
            'animationend',
            () => {
                setSlide(preparedSlides[curSlideIndex + 1])
                setIndex(nextSlide.index)
                setAnimationName(noAnimationString)
            },
            { once: true }
        )
    }

    const leftArrowHandler = () => {
        let curSlideIndex = preparedSlides.findIndex((item) => item.id === slide.id)
        if (!loop && !curSlideIndex) {
            return
        }
        if (loop && !curSlideIndex) {
            curSlideIndex = preparedSlides.length
        }

        handleLeftMove(slide, curSlideIndex - 1)
    }

    useEffect(() => {
        if (!isAuto) return
        setTimerId(() =>
            setTimeout(() => {
                rightArrowHandler()
            }, delay)
        )
    }, [isAuto, delay, slide])

    return {
        slide,
        nextSlide,
        animationRef,
        index,
        animationName,
        leftArrowHandler,
        rightArrowHandler,
        handleMouseEnter,
        handleMouseLeave,
    }
}

// const handlePaginationBtn = (newIndex: number): void => {
//     if (newIndex === index) {
//         return
//     }
//     const curSlideIndex: number = preparedSlides.findIndex((item) => item.index === index)
//
//     if (newIndex < index) {
//         handleLeftMove(slide, curSlideIndex)
//     } else {
//         handleRightMove(curSlideIndex)
//     }
// }
