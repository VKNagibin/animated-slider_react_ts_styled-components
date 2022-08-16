import styled from "styled-components";

export const PaginationBtn = styled.button`
  transition: background-color .5s;
  display: flex;
  border: 1px solid gray;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 2rem;
  box-sizing: content-box;
  background: rgba(255, 255, 255, 0.77);
  width: 40px;
  height: 40px;
  cursor: pointer;

  &.current {
    background-color: rgba(121, 119, 119, 0.8);
  }
  
  @media (max-width: 720px) {
    width: 30px;
    height: 30px;
    font-size: 1.5rem;
  }
`