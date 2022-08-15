import { Image } from "./styled";

interface IProps {
    src: string,
    width: number,
    height: number,
}

export default function SliderImage({ src, width, height }: IProps) {
    return (
        <Image src={src} style={{minWidth: `${width}px`, minHeight: `${height}px` }}/>
    )
}