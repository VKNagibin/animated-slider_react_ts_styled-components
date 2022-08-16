import styled from "styled-components";

export const AppComponent = styled.div`
  padding: 40px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(204, 164, 253, 0.27);
  
  @media ( max-width: 720px) {
    padding: 5px;
  }
`