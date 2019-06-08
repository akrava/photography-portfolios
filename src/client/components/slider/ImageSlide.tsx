import React from "react";

export interface IImageSlideProps {
    img: string;
    active: boolean;
}

class ImageSlide extends React.Component<IImageSlideProps> {
    render() {
        const { img, active } = this.props;
        return (
            <div className="slider__slide">
                <img
                    className={`slide__img ${active && "slide__img_active"}`}
                    src={img}
                />
            </div>
        );
    }
}

export default ImageSlide;
