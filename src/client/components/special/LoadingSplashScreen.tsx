import React from "react";
import classNames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

export interface ILoadingSplashScreenProps {
    text?: string;
    isLoading: boolean;
}

class LoadingSplashScreen extends React.Component<ILoadingSplashScreenProps> {
    refWrapper = React.createRef<HTMLDivElement>();

    getCurrentClassName(isLoading: boolean) {
        return isLoading ?  "" : "loading-wrapper_inactive";
    }

    componentDidUpdate() {
        if (this.props.isLoading === false) {
            window.setTimeout(() => {
                this.refWrapper.current!.classList.add("loading-wrapper_disabled");
            }, 1000);
        }
    }

    render() {
        const { text, isLoading } = this.props;
        return (
            <div
                className={classNames("loading-wrapper", this.getCurrentClassName(isLoading))}
                ref={this.refWrapper}
            >
                <CircularProgress size={100} />
                <Typography className="loading-wrapper__text" variant="inherit">
                    {text ? text : "Loading"}
                </Typography>
            </div>
        );
    }
}

export default LoadingSplashScreen;
