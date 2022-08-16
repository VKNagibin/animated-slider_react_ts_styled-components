import React from 'react';
import Slider from "../Slider";
import { nanoid } from "nanoid";
import { ArraySlides } from "./types";
import { AppComponent} from "./styled";

function App() {
    const arraySlides: ArraySlides = [
        {
            img: "https://mirpozitiva.ru/wp-content/uploads/2019/11/1477469601_nature_gora.jpg",
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
    ].map((item:{img: string, text?: string}, index: number) => ({ ...item, id: nanoid(), index: index }));

  return (
      <AppComponent>
          <Slider slides={arraySlides}
                  loop={true}
                  pags={true}
                  navs={true}
                  auto={false}
                  // delay={1}
                  stopMouseHover={false}
          />
      </AppComponent>
  );
}

export default App;
