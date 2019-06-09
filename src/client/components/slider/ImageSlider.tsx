import React from "react";
import ImageSlide from "@components/slider/ImageSlide";
import ArrowControls from "@components/slider/ArrowControls";
import SliderBreadcrumbs from "@components/slider/SliderBreadcrumbs";
import classNames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";

export interface IImageSliderProps {
    images: string[];
}

export interface IImageSliderState {
    currentSlide: number;
    countAllSlides: number;
    autoplayIntervalId: number;
    loadedImages: boolean[] | null;
}

class ImageSlider extends React.Component<IImageSliderProps, IImageSliderState> {
    refSliderViewport = React.createRef<HTMLDivElement>();

    state: IImageSliderState = {
        currentSlide: 0,
        countAllSlides: 0,
        autoplayIntervalId: -1,
        loadedImages: null
    };

    componentDidUpdate() {
        const { currentSlide, autoplayIntervalId, loadedImages } = this.state;
        const el = this.refSliderViewport.current!;
        const width = el.clientWidth;
        el.style.transform = `translateX(-${width * currentSlide}px)`;
        if (autoplayIntervalId < 0 && loadedImages && loadedImages.every((x) => x === true)) {
            this.enableAutoplay();
        }
    }

    componentWillUnmount() {
        const { autoplayIntervalId } = this.state;
        if (autoplayIntervalId > 0) {
            window.clearInterval(autoplayIntervalId);
        }
    }

    enableAutoplay = () => {
        const autoplayIntervalId = window.setInterval(() => {
            this.switchToNextSlide();
        }, 3000);
        this.setState({ autoplayIntervalId });
    }

    componentDidMount() {
        const { images } = this.props;
        this.setState({
            countAllSlides: images.length,
            loadedImages: Array(images.length).fill(false)
        });
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

    handleLoadImage = (i: number) => {
        const { loadedImages } = this.state;
        if (!loadedImages) {
            return;
        }
        loadedImages[i] = true;
        this.setState({
            loadedImages
        });
    }

    render() {
        const {
            switchToSlide, switchToNextSlide, switchToPrevSlide, refSliderViewport, handleLoadImage
        } = this;
        const { currentSlide, countAllSlides, loadedImages } = this.state;
        const { images } = this.props;
        const allImagesLoaded = loadedImages && loadedImages.every((x) => x === true);
        return (
            <div className="slider">
                <div className="slider__wrapper">
                    <div ref={refSliderViewport} className="slider__viewport">
                        {images.map((x, i) => (
                            <ImageSlide
                                onLoad={() => handleLoadImage(i)}
                                active={i === currentSlide}
                                key={i}
                                img={x}
                            />
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
                <div
                    className={classNames(
                        "slider__load-wrapper",
                        allImagesLoaded && "slider__load-wrapper_loaded"
                    )}
                >
                    <CircularProgress  size={160} className="slider__load-circle" color="inherit" />
                </div>
            </div>
        );
    }
}

export default ImageSlider;
