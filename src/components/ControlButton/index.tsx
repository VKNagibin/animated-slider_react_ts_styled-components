import { CaretRightSquareFill } from "react-bootstrap-icons";
import { CaretLeftSquareFill } from "react-bootstrap-icons";
import { RightBtn, LeftBtn } from "./styled";

type SideType = "Left" | "Right";

interface IProps {
    changeSlide: (side: SideType, index: number) => void;
    direction: SideType;
    index: number;
}

export default function ControlButton(props: IProps):JSX.Element {
    const handleClick = (): void => {
        props.changeSlide(props.direction, props.index);
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