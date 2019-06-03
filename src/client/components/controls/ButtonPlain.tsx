import React from "react";
import { Button } from "@material-ui/core";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const styles = () => createStyles({
    root: {
        borderRadius: "unset",
        margin: "unset",
        height: "100%",
        textTransform: "unset",
        fontSize: "unset",
        fontColor: "unset"
    }
});

interface IButtonPlainProps extends WithStyles<typeof styles> {
    className?: string;
}

class ButtonPlain extends React.Component<IButtonPlainProps> {
    render() {
        return (
            <div className={classNames("button-plain__wrapper", this.props.className)}>
                <Button component="div" className={this.props.classes.root}>
                    {this.props.children}
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(ButtonPlain);
