import styled from "styled-components";

export const PaginationBtn = styled.button`
  transition: background-color .5s;
  border-radius: 10px;
  font-size: 2rem;
  box-sizing: content-box;
  background: rgba(255, 255, 255, 0.77);
  min-width: 40px;
  height: 40px;
  cursor: pointer;

  &.current {
    background-color: rgba(121, 119, 119, 0.8);
  }
`