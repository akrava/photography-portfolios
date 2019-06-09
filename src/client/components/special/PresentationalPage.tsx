import React from "react";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";

export interface IPresentationalPageProps {
    classNameRoot?: string;
}

class PresentationalPage extends React.Component<IPresentationalPageProps> {
    render() {
        const { classNameRoot } = this.props;
        return (
            <div className={classNames("presentational", classNameRoot)}>
                <div className="presentational__bg-wrapper" />
                <Grid
                    className="presentational__container"
                    container={true}
                    justify={"center"}
                >
                    <Grid
                        className="presentational__content"
                        item={true}
                        xs={12}
                        sm={6}
                        md={5}
                        lg={4}
                        container={true}
                        alignItems={"center"}
                    >
                        {this.props.children}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default PresentationalPage;
