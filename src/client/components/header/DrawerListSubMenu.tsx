import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import { ISubMenuProps } from "@components/header/SubMenu";
import DrawerListItem from "@components/header/DrawerListItem";

const styles = () => createStyles({
    nestedListItem: {
        paddingLeft: "2rem"
    }
});

class DrawerListSubMenu extends React.Component<ISubMenuProps & WithStyles<typeof styles>> {
    state = {
        isOpened: false
    };

    handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        this.setState({
            isOpened: !this.state.isOpened
        });
    }

    render() {
        const { isOpened } = this.state;
        const { handleClick } = this;
        const { name, menu } = this.props;
        const { nestedListItem } = this.props.classes;
        const selected = menu.some((x) => x.link === window.location.pathname);
        return (
            <>
                <ListItem selected={selected} button={true} onClick={handleClick}>
                    <ListItemText primary={name} />
                    {isOpened ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={isOpened} timeout="auto" unmountOnExit={true}>
                    <List component="div"disablePadding={true}>
                        {menu.map((x, index) => (
                            <DrawerListItem
                                className={nestedListItem}
                                key={index}
                                name={x.name}
                                link={x.link!}
                            />
                        ))}
                    </List>
                </Collapse>
            </>
        );
    }
}

export default  withStyles(styles)(DrawerListSubMenu);
