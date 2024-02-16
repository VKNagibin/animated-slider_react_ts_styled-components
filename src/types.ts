import React from 'react'

export interface SliderInterface {
    slides: InitialSlideType[]
    stopOnMouseOver?: boolean
    delay?: number
    auto?: boolean
    withNavigation?: boolean
    navigationComponent?: React.ReactNode
    withPagination?: boolean
    paginationComponent?: React.ReactNode
    loop?: boolean
}

export type SlideType = {
    img: string
    text: string
    id: string
    index: number
}

export type InitialSlideType = {
    img: string
    text: string
}
