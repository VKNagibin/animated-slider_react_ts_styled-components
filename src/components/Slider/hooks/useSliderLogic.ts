import { useEffect, useRef, useState } from 'react'

import { InitialSlideType, ModeAutoInterface, DirectionType } from '@/types'

import useSlides from './useSlides'

interface HookInterface {
    slides: InitialSlideType[]
    stopOnMouseOver: boolean
    auto?: ModeAutoInterface
    infinitely: boolean
}

const defaultDelay = 1000

const leftDirectionAnimationName = 'leftDirection'
const rightDirectionAnimationName = 'rightDirection'
const noAnimationString = ''

export default function useSliderLogic({ slides, auto, infinitely, stopOnMouseOver }: HookInterface) {
    const [index, setIndex] = useState<number>(0)
    const [animationName, setAnimationName] = useState(noAnimationString)
    const [isAuto, setIsAuto] = useState<boolean>(!!auto)
    const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout>>()

    const animationRef = useRef<HTMLDivElement>(null)

    const { preparedSlides, leftSlide, mainSlide, rightSlide, setLeftSlide, setMainSlide, setRightSlide } =
        useSlides(slides)

    const leftArrowHandler = () => {
        let curSlideIndex = preparedSlides.findIndex((item) => item.id === mainSlide.id)
        if (curSlideIndex < 0) return
        if (!infinitely && curSlideIndex === 0) return
        if (curSlideIndex === 0) curSlideIndex = preparedSlides.length
        handleLeftMove(curSlideIndex - 1)
    }

    const handleLeftMove = (leftSlideIndex: number) => {
        setLeftSlide(preparedSlides[leftSlideIndex])
        setAnimationName(leftDirectionAnimationName)

        if (!animationRef.current) return

        animationRef.current.addEventListener(
            'animationend',
            () => {
                setAnimationName(noAnimationString)
                setIndex(leftSlideIndex)
                setMainSlide(preparedSlides[leftSlideIndex])
                setLeftSlide(undefined)
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

    const handleRightMove = (rightSlideIndex: number) => {
        setRightSlide(preparedSlides[rightSlideIndex])
        setAnimationName(rightDirectionAnimationName)

        if (!animationRef.current) return

        animationRef.current.addEventListener(
            'animationend',
            () => {
                setAnimationName(noAnimationString)
                setIndex(rightSlideIndex)
                setMainSlide(preparedSlides[rightSlideIndex])
                setRightSlide(undefined)
            },
            { once: true }
        )
    }
    const rightArrowHandler = () => {
        let curSlideIndex = preparedSlides.findIndex((item) => item.id === mainSlide.id)
        if (curSlideIndex < 0) return
        if (curSlideIndex === preparedSlides.length - 1) {
            curSlideIndex = -1
        }
        if (!infinitely && curSlideIndex < 0) return

        if (curSlideIndex < 0) {
            handleRightMove(0)
            return
        }
        handleRightMove(curSlideIndex + 1)
    }

    const handlePaginationBtn = (newIndex: number): void => {
        if (newIndex === index) {
            return
        }
        if (newIndex < index) {
            handleLeftMove(newIndex)
        } else {
            handleRightMove(newIndex)
        }
    }

    useEffect(() => {
        if (!auto || !isAuto) return
        setTimerId(() =>
            setTimeout(() => {
                if (!auto.direction || auto.direction === DirectionType.RIGHT) {
                    rightArrowHandler()
                    return
                }
                leftArrowHandler()
            }, auto.delay || defaultDelay)
        )
    }, [isAuto, auto, mainSlide])

    return {
        leftSlide,
        mainSlide,
        rightSlide,
        animationRef,
        index,
        animationName,
        leftArrowHandler,
        rightArrowHandler,
        handlePaginationBtn,
        handleMouseEnter,
        handleMouseLeave,
    }
}
