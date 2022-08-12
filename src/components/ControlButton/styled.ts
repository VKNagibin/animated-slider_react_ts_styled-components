import styled from "styled-components";

const LeftBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 5%;
  border: none;
  background: black;
  transform: translateY(-50%);

  .left-arrow, .right-arrow {
    will-change: transform;
    transition: .2s;
    background: #000;
    transform: scale(5);
    color: #deabff;
    border-radius: 50%;
    box-sizing: content-box;
    border: 1px solid #1c191e;

    &:hover {
      transform: scale(5.2);

    }
  }
`

const RightBtn = styled(LeftBtn)`
  left: auto;
  right: 5%;
  
`

export {
    LeftBtn,
    RightBtn,
}