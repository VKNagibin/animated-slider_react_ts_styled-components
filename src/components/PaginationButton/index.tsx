import React from "react";
import { PaginationBtn } from "./styled";

interface IProps {
    index: number,
    curSlide: number,
    changeSlide: (direction: "Left" | "Right" | null, source: string, index?: number) => void;
    source: string,
}

export default function PaginationButton(props: IProps): JSX.Element {
    const clickHandler = (): void => {
        let direction: "Left" | "Right" | null = null;

        if (props.index > props.curSlide) direction = "Right";
        if (props.index < props.curSlide) direction = "Left";

        props.changeSlide(direction, props.source, props.index);
    }

    return (
        <PaginationBtn className={props.index === props.curSlide ? "current": ""}
                       onClick={clickHandler}>
        </PaginationBtn>
    )

}