import { CaretRightSquareFill } from "react-bootstrap-icons";
import { CaretLeftSquareFill } from "react-bootstrap-icons";
import { RightBtn, LeftBtn } from "./styled";

type SideType = "Left" | "Right";

interface IProps {
    changeSlide: (side: SideType, index: number, source: string) => void;
    direction: SideType;
    index: number;
    source: string;
}

export default function ControlButton(props: IProps):JSX.Element {
    const handleClick = (): void => {
        props.changeSlide(props.direction, props.index, props.source);
    }

    return (
        props.direction === "Left" ?
            <LeftBtn>
                <CaretLeftSquareFill className="left-arrow" onClick={handleClick} />
            </LeftBtn>
            :
            <RightBtn>
                <CaretRightSquareFill className="right-arrow" onClick={handleClick} />
            </RightBtn>
    )

}