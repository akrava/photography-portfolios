import React from "react";
import ImageSlide from "@components/slider/ImageSlide";
import ArrowControls from "@components/slider/ArrowControls";
import SliderBreadcrumbs from "@components/slider/SliderBreadcrumbs";

export interface IImageSliderProps {
    images: string[];
}

export interface IImageSliderState {
    currentSlide: number;
    countAllSlides: number;
}

class ImageSlider extends React.Component<IImageSliderProps, IImageSliderState> {
    refSliderViewport = React.createRef<HTMLDivElement>();

    state = {
        currentSlide: 0,
        countAllSlides: 0,
    };

    componentDidUpdate() {
        const { currentSlide } = this.state;
        const el = this.refSliderViewport.current!;
        const width = el.clientWidth;
        el.style.transform = `translateX(-${width * currentSlide}px)`;
    }

    componentDidMount() {
        const { images } = this.props;
        this.setState({ countAllSlides: images.length });
    }

    switchToSlide = (slide: number) => {
        const { currentSlide, countAllSlides } = this.state;
        if (slide === currentSlide) {
            return;
        }
        if (slide >= countAllSlides) {
            slide = 0;
        } else if (slide < 0) {
            slide = countAllSlides - 1;
        }
        this.setState({ currentSlide: slide });
    }

    switchToNextSlide = () => {
        const { currentSlide } = this.state;
        this.switchToSlide(currentSlide + 1);
    }

    switchToPrevSlide = () => {
        const { currentSlide } = this.state;
        this.switchToSlide(currentSlide - 1);
    }

    render() {
        const { switchToSlide, switchToNextSlide, switchToPrevSlide, refSliderViewport } = this;
        const { currentSlide, countAllSlides } = this.state;
        const { images } = this.props;
        return (
            <div className="slider">
                <div className="slider__wrapper">
                    <div ref={refSliderViewport} className="slider__viewport">
                        {images.map((x, i) => (
                            <ImageSlide active={i === currentSlide} key={i} img={x} />
                        ))}
                    </div>
                </div>
                <ArrowControls
                    side="left"
                    onChangeSlide={switchToPrevSlide}
                />
                <ArrowControls
                    side="right"
                    onChangeSlide={switchToNextSlide}
                />
                <SliderBreadcrumbs
                    all={countAllSlides}
                    current={currentSlide}
                    onChangeSlide={switchToSlide}
                />
            </div>
        );
    }
}

export default ImageSlider;
