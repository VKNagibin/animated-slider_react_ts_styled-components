import React from 'react'

export interface SliderInterface {
    slides: InitialSlideType[]
    stopOnMouseOver?: boolean
    auto?: ModeAutoInterface
    withNavigation?: boolean
    navigationComponent?: React.ReactNode
    withPagination?: boolean
    paginationComponent?: React.ReactNode
    infinitely?: boolean
}

export interface ModeAutoInterface {
    active: boolean
    delay?: number
    direction?: DirectionType
}

export enum DirectionType {
    LEFT = 'left',
    RIGHT = 'right',
}

export type SlideType = {
    src: string
    description: string
    id: string
    index: number
}

export type InitialSlideType = {
    src: string
    description: string
}
