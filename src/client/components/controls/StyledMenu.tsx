import React from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";

const stylesForMenu = () => createStyles({
    paper: {
        border: "1px solid #d3d4d5",
    }
});

class StyledMenu extends React.Component<WithStyles<typeof stylesForMenu> & MenuProps> {
    render() {
        return (
            <Menu
                classes={{ paper: this.props.classes.paper }}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                {...this.props}
            />
        );
    }
}

export default withStyles(stylesForMenu)(StyledMenu);
