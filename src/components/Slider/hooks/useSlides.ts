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

    const [leftSlide, setLeftSlide] = useState<SlideType>()
    const [mainSlide, setMainSlide] = useState<SlideType>(preparedSlides[0])
    const [rightSlide, setRightSlide] = useState<SlideType>()

    return {
        preparedSlides,
        leftSlide,
        mainSlide,
        rightSlide,
        setLeftSlide,
        setMainSlide,
        setRightSlide,
    }
}
