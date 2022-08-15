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
  background: transparent;
  transform: translateY(-50%);

  .left-arrow, .right-arrow {
    will-change: transform;
    transition: .2s;
    background: rgba(0, 0, 0, 0.92) ;
    transform: scale(5);
    color: rgba(255, 255, 255, 0.98);
    border-radius: 2px;
    box-sizing: content-box;

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