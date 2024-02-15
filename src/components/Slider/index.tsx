import { SliderInterface } from '../../sliderTypes'
import ControlButton from '../ControlButton'
import PaginationButton from '../PaginationButton'
import { nanoid } from 'nanoid'
import React, { memo } from 'react'
import {
    StyledComponentContainer,
    StyledDescription,
    StyledImage,
    StyledPaginationContainer,
    StyledSliderContainer,
    StyledSlidesContainer,
    StyledSlidesCount,
} from './styled'
import useSliderLogic from './hooks/useSliderLogic'

function Slider({
    slides = [],
    delay,
    auto = false,
    withNavigation,
    withPagination,
    loop,
    stopOnMouseOver,
}: SliderInterface) {
    const {
        slide,
        nextSlide,
        index,
        left,
        right,
        translation,
        handleMouseLeave,
        handleMouseEnter,
        handlePaginationBtn,
        leftArrowHandler,
        rightArrowHandler,
    } = useSliderLogic({ slides, auto, delay, loop, stopOnMouseOver })

    return (
        <StyledComponentContainer>
            <StyledSliderContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {withNavigation && (
                    <>
                        <ControlButton side="left" onClick={leftArrowHandler} />
                        <ControlButton side="right" onClick={rightArrowHandler} />
                    </>
                )}

                <StyledSlidesCount>{`${index + 1} / ${slides.length}`}</StyledSlidesCount>
                <StyledSlidesContainer
                    className={left ? 'animLeft' : right ? 'animRight' : ''}
                    translation={translation}
                >
                    <StyledImage src={slide.img} />
                    <StyledImage src={nextSlide.img} />
                </StyledSlidesContainer>
                <StyledDescription>{slides[index].text}</StyledDescription>
            </StyledSliderContainer>
            {withPagination && (
                <StyledPaginationContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {slides.map(
                        (_, index: number): JSX.Element => (
                            <PaginationButton
                                key={nanoid()}
                                handlePaginationBtn={handlePaginationBtn}
                                index={index}
                                curSlide={index}
                            />
                        )
                    )}
                </StyledPaginationContainer>
            )}
        </StyledComponentContainer>
    )
}

export default memo(Slider)
