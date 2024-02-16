import { useMemo, useState } from 'react'
import { nanoid } from 'nanoid'

import { InitialSlideType, SlideType } from '@/types'

export default function useSlides(slides: InitialSlideType[]) {
    const preparedSlides: SlideType[] = useMemo(
        () =>
            slides.map((item, index) => ({
                ...item,
                id: nanoid(),
                index: index,
            })),
        [slides]
    )

    const [slide, setSlide] = useState<SlideType>(preparedSlides[0])
    const [nextSlide, setNextSlide] = useState<SlideType>(preparedSlides[1])

    return {
        preparedSlides,
        slide,
        setSlide,
        nextSlide,
        setNextSlide,
    }
}
