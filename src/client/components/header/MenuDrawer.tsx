import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/icons/Input";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonAdd from "@material-ui/icons/PersonAdd";
import DrawerListItem from "@components/header/DrawerListItem";
import { WithStyles, withStyles, createStyles, Theme } from "@material-ui/core/styles";

const styles = ({ mixins }: Theme) => createStyles({
    toolbar: mixins.toolbar,
});

export interface IMenuDrawerProps {
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
    drawerIsOpened: boolean;
}

class MenuDrawer extends React.Component<IMenuDrawerProps & WithStyles<typeof styles>> {
    render() {
        const { classes, toggleDrawer, drawerIsOpened } = this.props;
        return (
            <nav className="header_menu-drawer">
                <SwipeableDrawer
                    variant="temporary"
                    open={drawerIsOpened}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <div
                        role="presentation"
                         className="drawer"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <div className={classes.toolbar} />
                        <Divider />
                        <List>
                            <DrawerListItem name="Login" link="/login">
                                <ListItemIcon>
                                    <Input />
                                </ListItemIcon>
                            </DrawerListItem>
                            <DrawerListItem name="Register" link="/register">
                                <ListItemIcon>
                                    <PersonAdd />
                                </ListItemIcon>
                            </DrawerListItem>
                        </List>
                        <Divider />
                        <List>
                            {this.props.children}
                        </List>
                    </div>
                </SwipeableDrawer>
            </nav>
        );
    }
}

export default withStyles(styles)(MenuDrawer);
