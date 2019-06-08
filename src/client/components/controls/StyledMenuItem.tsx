import React from "react";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

const styles = ({ palette }: Theme) => createStyles({
    root: {
        "&:focus": {
            backgroundColor: palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: palette.common.white,
            }
        }
    }
});

interface IStyledMenuItemProps extends WithStyles<typeof styles> {
    onClick?: React.MouseEventHandler<HTMLLIElement>;
}

class StyledMenuItem extends React.Component<IStyledMenuItemProps> {
    render() {
        return (
            <MenuItem
                onClick={this.props.onClick}
                classes={{ root: this.props.classes.root }}
            >
                {this.props.children}
            </MenuItem>
        );
    }
}

export default withStyles(styles)(StyledMenuItem);
