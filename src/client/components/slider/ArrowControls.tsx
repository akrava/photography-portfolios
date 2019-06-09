import React from "react";
import ChevronLeftRounded from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded";
import classNames from "classnames";

export interface IArrowControlsProps {
    side: "left" | "right";
    onChangeSlide: () => void;
}

class ArrowControls extends React.Component<IArrowControlsProps> {
    render() {
        const { side, onChangeSlide } = this.props;
        const classForArrow = side === "left" ? "slider__arrow_left" : "slider__arrow_right" ;
        return (
            <div onClick={onChangeSlide} className={classNames("slider__arrow", classForArrow)}>
                {side === "left"
                    ? <ChevronLeftRounded className="slider__arrow-icon" fontSize="inherit" />
                    : <ChevronRightRounded className="slider__arrow-icon" fontSize="inherit" />
                }
            </div>
        );
    }
}

export default ArrowControls;
