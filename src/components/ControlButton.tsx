import { CaretRightSquareFill } from 'react-bootstrap-icons'
import { CaretLeftSquareFill } from 'react-bootstrap-icons'
import styled from 'styled-components'

const LeftBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 20px;
    border: none;
    background: transparent;
    transform: translateY(-50%);

    .left-arrow,
    .right-arrow {
        will-change: transform;
        transition: 0.3s;
        transform: scale(3);
        color: #deabff;

        &:hover {
            transform: scale(3.2);
        }
    }
`

const RightBtn = styled(LeftBtn)`
    left: auto;
    right: 20px;
`

interface IProps {
    controlBtnHandler: (side: string) => void;
    side: "left" | "right";
}

export default function ControlButton(props: IProps):JSX.Element {
    const handleClick = (): void => {
        props.controlBtnHandler(props.side);
    }

    return (
        props.side === "left" ?
            <LeftBtn>
                <CaretLeftSquareFill className="left-arrow" onClick={handleClick} />
            </LeftBtn>
            :
            <RightBtn>
                <CaretRightSquareFill className="right-arrow" onClick={handleClick} />
            </RightBtn>
    )

}