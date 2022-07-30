import styled from "styled-components";
import React from "react";

const PaginationBtn = styled.button`
  transition: background-color .5s;
  border-radius: 50%;
  background: rgba(95, 61, 168, 0.77);
  width: 20px;
  height: 20px;
  cursor: pointer;
  
  &.current {
    background-color: cornflowerblue;
  }
`

interface IProps {
    index: number,
    curSlide: number,
    handlePaginationBtn: (index: number) => void,
}

export default function PaginationButton(props: IProps):JSX.Element {
    const clickHandler = ():void => {
        props.handlePaginationBtn(props.index);
    }

    return (
        <PaginationBtn className={props.index === props.curSlide ? "current": ""}
                       onClick={clickHandler}>

        </PaginationBtn>
    )

}