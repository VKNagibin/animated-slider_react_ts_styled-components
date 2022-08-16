import { Image } from "./styled";

interface IProps {
    src: string,
}

export default function SliderImage({ src }: IProps) {
    return (
        <Image src={src} />
    )
}