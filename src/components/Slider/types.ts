export interface IProps {
    width: number,
    height: number,
    stopMouseHover?: boolean,
    delay?: number,
    auto?: boolean,
    navs?: boolean,
    pags?: boolean,
    loop?: boolean,
    slides: {
        img: string,
        text?: string,
        id: string,
        index: number,
    }[]
}

export type AnimationType = "Left" | "Right" | "";

export type DirectionType = "Left" | "Right" | "don't move";

export type FlexJustifyType = "flex-start" | "flex-end" | "center" | "";

export interface ISliderProps {
    width: number,
    height: number,
    justifyContent: string,
}

export type Slide = {
    img: string,
    text?: string,
    id: string,
    index: number,
}

export interface INextSlideData {
    direction: "Left" | "Right",
    nextIndex: number
}


