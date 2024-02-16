import { nanoid } from 'nanoid'
import React, { memo } from 'react'

import { SliderInterface } from '@/types'
import ControlButton from '../ControlButton'
import PaginationButton from '../PaginationButton'
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
    auto,
    withNavigation,
    withPagination,
    infinitely = false,
    stopOnMouseOver = true,
}: SliderInterface) {
    const {
        leftSlide,
        mainSlide,
        rightSlide,
        animationRef,
        index,
        animationName,
        handleMouseLeave,
        handlePaginationBtn,
        handleMouseEnter,
        leftArrowHandler,
        rightArrowHandler,
    } = useSliderLogic({ slides, auto, infinitely, stopOnMouseOver })

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
                <StyledSlidesContainer ref={animationRef} className={animationName}>
                    {leftSlide && <StyledImage src={leftSlide.img} title="left" />}
                    <StyledImage src={mainSlide.img} title="main" />
                    {rightSlide && <StyledImage src={rightSlide.img} title="right" />}
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
