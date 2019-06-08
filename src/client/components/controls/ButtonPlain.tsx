import React from "react";
import { Button } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const styles = () => createStyles({
    root: {
        borderRadius: "unset",
        margin: "unset",
        height: "100%",
        textTransform: "unset",
        fontSize: "unset",
        color: "unset"
    }
});

class ButtonPlain extends React.Component<ButtonProps & WithStyles<typeof styles>> {
    render() {
        const { className } = this.props;
        const { root } = this.props.classes;
        return (
            <div className={classNames("button-plain__wrapper", className)}>
                <Button className={root} {...this.props}>
                    {this.props.children}
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(ButtonPlain);
