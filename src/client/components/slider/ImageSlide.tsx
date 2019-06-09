import React from "react";

export interface IImageSlideProps {
    img: string;
    active: boolean;
    onLoad?: () => void;
}

class ImageSlide extends React.Component<IImageSlideProps> {
    render() {
        const { img, active, onLoad } = this.props;
        return (
            <div className="slider__slide">
                <img
                    onLoad={onLoad}
                    className={`slide__img ${active && "slide__img_active"}`}
                    src={img}
                />
            </div>
        );
    }
}

export default ImageSlide;
