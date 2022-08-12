import React from "react";
import { PaginationBtn } from "./styled";
import { DirectionType } from "../Slider/types";

interface IProps {
    index: number,
    curSlide: number,
    changeSlide: (direction: DirectionType, index: number) => void;
}

export default function PaginationButton(props: IProps): JSX.Element {
    const clickHandler = (): void => {
        let direction: DirectionType = "don't move";

        if (props.index > props.curSlide) direction = "Right";
        if (props.index < props.curSlide) direction = "Left";

        props.changeSlide(direction, props.index);
    }

    return (
        <PaginationBtn className={props.index === props.curSlide ? "current": ""}
                       onClick={clickHandler}>
            { props.index + 1 }
        </PaginationBtn>
    )

}