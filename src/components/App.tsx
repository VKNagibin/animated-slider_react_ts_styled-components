import React from 'react';
import styled from "styled-components";
import Slider from "./Slider";
import { nanoid } from "nanoid";

const AppComponent = styled.div`
  padding: 40px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(204, 164, 253, 0.27);
`

type ArraySlides = {
    img: string,
    text: string,
    id: string;
    index: number,
}[];

function App() {
    const arraySlides: ArraySlides = [
        {
            img: "https://mirpozitiva.ru/wp-content/uploads/2019/11/1477469601_nature_gora.jpg",
            text: "1",
        },
        {
            img: "https://img.freepik.com/free-photo/river-surrounded-by-forests-under-a-cloudy-sky-in-thuringia-in-germany_181624-30863.jpg?w=2000",
            text: "2",
        },
        {
            img: "https://bipbap.ru/wp-content/uploads/2021/08/1547365435_25.jpg",
            text: "3",
        },
        {
            img: "https://mobimg.b-cdn.net/v3/fetch/90/905911947c2947e6dda5a8d9aa2af088.jpeg",
            text: "4",
        },
        {
            img: "https://bipbap.ru/wp-content/uploads/2017/07/morskie_peyzagi_krasivie_plyagi_foto_12.jpg",
            text: "5",
        },
    ].map((item:{img: string, text: string}, index: number) => ({ ...item, id: nanoid(), index: index }));

  return (
      <AppComponent>
          <Slider slides={arraySlides}
                  loop={true}
                  pags={true}
                  navs={true}
                  auto={true}
                  delay={2}
                  stopMouseHover={false}/>
      </AppComponent>
  );
}

export default App;
