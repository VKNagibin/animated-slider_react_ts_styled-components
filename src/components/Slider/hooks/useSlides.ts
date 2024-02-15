import { useMemo, useState } from 'react'
import { Slide } from '../../../sliderTypes'
import { InitialSlideType, SlideType } from '../../App/types'
import { nanoid } from 'nanoid'

export default function useSlides(slides: InitialSlideType[]) {
    const preparedSlides: SlideType[] = useMemo(
        () =>
            slides.map(
                (
                    item: {
                        img: string
                        text: string
                    },
                    index: number
                ) => ({
                    ...item,
                    id: nanoid(),
                    index: index,
                })
            ),
        [slides]
    )

    const [slide, setSlide] = useState<Slide>(preparedSlides[0])
    const [nextSlide, setNextSlide] = useState<Slide>(preparedSlides[1])

    return {
        preparedSlides,
        slide,
        setSlide,
        nextSlide,
        setNextSlide,
    }
}
