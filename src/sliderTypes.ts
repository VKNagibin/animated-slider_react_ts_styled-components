export interface IProps {
    stopMouseHover?: boolean,
    delay?: number,
    auto?: boolean,
    navs?: boolean,
    pags?: boolean,
    loop?: boolean,
    slides: {
        img: string,
        text: string,
        id: string,
        index: number,
    }[]
}

export type Slide = {
    img: string
    text: string
    id: string
    index: number
}

export type SlidesContainerProps = {
    translation: number
}
