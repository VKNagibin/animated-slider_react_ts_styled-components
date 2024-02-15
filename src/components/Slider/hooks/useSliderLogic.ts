import { Slide, SliderInterface } from '../../../sliderTypes'
import { useCallback, useEffect, useState } from 'react'
import useSlides from './useSlides'

type HookPropsType = Pick<SliderInterface, 'slides' | 'auto' | 'delay' | 'loop' | 'stopOnMouseOver'>

export default function useSliderLogic({ slides, auto = false, delay, loop, stopOnMouseOver }: HookPropsType) {
    const [prevCall, setPrevCall] = useState<number>(Date.now())
    const [index, setIndex] = useState<number>(0)
    const [translation, setTranslation] = useState<number>(0)
    const [left, setLeft] = useState<boolean>(false)
    const [right, setRight] = useState<boolean>(false)
    const [isAuto, setIsAuto] = useState<boolean>(auto)
    const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout>>()

    const { nextSlide, slide, preparedSlides, setSlide, setNextSlide } = useSlides(slides)

    const handleLeftMove = (slide: Slide, nextSlide: number) => {
        setNextSlide(slide)
        setTranslation(-600)
        setLeft(true)
        setPrevCall(Date.now())
        setSlide(preparedSlides[nextSlide])

        setTimeout(() => {
            if (nextSlide === preparedSlides.length - 1) {
                setNextSlide(preparedSlides[0])
            } else {
                setNextSlide(preparedSlides[nextSlide + 1])
            }
            setLeft(false)
            setTranslation(0)
            setIndex(nextSlide)
        }, 600)
    }

    const handlePaginationBtn = (newIndex: number): void => {
        if (newIndex === index) {
            return
        }
        const curSlideIndex: number = preparedSlides.findIndex((item) => item.index === index)

        if (newIndex < index) {
            handleLeftMove(slide, curSlideIndex)
        } else {
            handleRightMove(curSlideIndex)
        }
    }

    const leftArrowHandler = () => {
        if (Date.now() - prevCall > 800) {
            let curSlideIndex = preparedSlides.findIndex((item) => item.id === slide.id)
            if (!loop && !curSlideIndex) {
                return
            }
            if (loop && !curSlideIndex) {
                curSlideIndex = preparedSlides.length
            }

            handleLeftMove(slide, curSlideIndex - 1)
        }
    }

    const handleRightMove = (nextSlide: number) => {
        setNextSlide(preparedSlides[nextSlide])
        setRight(true)
        setPrevCall(Date.now())

        setTimeout(() => {
            setSlide(preparedSlides[nextSlide])
            if (nextSlide < preparedSlides.length - 1) {
                setNextSlide(preparedSlides[nextSlide + 1])
            } else {
                setNextSlide(preparedSlides[0])
            }
            setIndex(nextSlide)
            setRight(false)
            setTranslation(0)
        }, 600)
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

    const rightArrowHandler = useCallback(() => {
        if (Date.now() - prevCall > 800) {
            let curSlideIndex = preparedSlides.findIndex((item) => item.id === slide.id)
            if (curSlideIndex === preparedSlides.length - 1) {
                curSlideIndex = -1
            }

            if (!loop && curSlideIndex === -1) {
                return
            }

            setRight(true)
            setPrevCall(Date.now())

            setTimeout(() => {
                setSlide(preparedSlides[curSlideIndex + 1])
                if (curSlideIndex === preparedSlides.length - 2) {
                    setNextSlide(preparedSlides[0])
                } else {
                    setNextSlide(preparedSlides[curSlideIndex + 2])
                }
                setIndex(nextSlide.index)
                setRight(false)
                setTranslation(0)
            }, 600)
        }
    }, [loop, setNextSlide, setSlide, preparedSlides])

    useEffect(() => {
        if (isAuto) {
            setTimerId(
                setTimeout(() => {
                    rightArrowHandler()
                }, delay)
            )
        }
        return function () {
            clearTimeout(timerId)
        }
    }, [delay, isAuto, rightArrowHandler])

    return {
        slide,
        nextSlide,
        index,
        left,
        right,
        translation,
        handlePaginationBtn,
        leftArrowHandler,
        rightArrowHandler,
        handleMouseEnter,
        handleMouseLeave,
    }
}
