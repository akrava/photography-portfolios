import React from "react";
import classNames from "classnames";

export interface ISliderBreadcrumbsProps {
    current: number;
    all: number;
    onChangeSlide: (slide: number) => void;
}

class SliderBreadcrumbs extends React.Component<ISliderBreadcrumbsProps> {
    renderBreadcrumbs() {
        const { current, all, onChangeSlide } = this.props;
        const breadcrumbs = [];
        for (let i = 0; i < all; i++) {
            breadcrumbs.push(
                <span
                    key={i}
                    onClick={() => onChangeSlide(i)}
                    className={classNames("breadcrumbs__point", `${i === current && " breadcrumbs__point_active"}`)}
                />
            );
        }
        return breadcrumbs;
    }

    render() {
        return (
            <nav className="slider__breadcrumbs">
                {this.renderBreadcrumbs()}
            </nav>
        );
    }
}

export default SliderBreadcrumbs;
