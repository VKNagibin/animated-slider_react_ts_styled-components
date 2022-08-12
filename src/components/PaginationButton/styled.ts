import styled from "styled-components";

export const PaginationBtn = styled.button`
  transition: background-color .5s;
  border-radius: 50%;
  background: rgba(95, 61, 168, 0.77);
  min-width: 40px;
  height: 40px;
  cursor: pointer;
  
  &.current {
    background-color: #deabff;
  }
`