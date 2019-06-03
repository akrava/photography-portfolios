import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { WithStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles";

const styles = ({ palette }: Theme) => createStyles({
    paper: {
        border: "1px solid #d3d4d5",
    },
    menuItem: {
        "&:focus": {
            backgroundColor: palette.primary.dark,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: palette.common.white,
            },
        },
    },
});

interface ISubMenuState {
    anchorEl: null | HTMLElement;
    mouseOverButton: boolean;
    mouseOverMenu: boolean;
    lastChange: number;
}

class SubMenu extends React.Component<WithStyles<typeof styles>, ISubMenuState> {
    timeout = 1200;

    state = {
        anchorEl: null,
        mouseOverButton: false,
        mouseOverMenu: false,
        lastChange: performance.now()
    };

    handleClick = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ mouseOverButton: false, mouseOverMenu: false });
    }

    enterButton = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ mouseOverButton: true, anchorEl: event.currentTarget, lastChange: performance.now() });
    }

    leaveButton = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(performance.now() - this.state.lastChange);
        if (performance.now() - this.state.lastChange > this.timeout) {
            this.setState({ mouseOverButton: false });
        }
    }

    enterMenu = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ mouseOverMenu: true, anchorEl: event.currentTarget, lastChange: performance.now() });
    }

    leaveMenu = () => {
        console.log(performance.now() - this.state.lastChange);
        if (performance.now() - this.state.lastChange > this.timeout) {
            this.setState({ mouseOverButton: false });
        }
    }

    render() {
        const { handleClick, leaveButton, handleClose, leaveMenu, enterButton, enterMenu } = this;
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = this.state.mouseOverButton || this.state.mouseOverMenu;
        return (
            <div>
                <Button
                    aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    onMouseOverCapture={enterButton}
                    onMouseOutCapture={leaveButton}
                >
                    Open Menu
                </Button>
                <Menu
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
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        onMouseEnter: enterMenu,
                        onMouseLeave: leaveMenu,
                    }}
                    classes={{paper: classes.paper}}
                >
                    <MenuItem onClick={handleClose} className={classes.menuItem}>
                        <ListItemText primary="Sent mail" />
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.menuItem}>
                        <ListItemText primary="Drafts" />
                    </MenuItem>
                    <MenuItem onClick={handleClose} className={classes.menuItem}>
                        <ListItemText primary="Inbox" />
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(SubMenu);
