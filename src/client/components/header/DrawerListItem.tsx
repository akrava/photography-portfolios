import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IMenuItemProps } from "@components/header/MenuItem";

interface IDrawerListItemProps extends IMenuItemProps, RouteComponentProps {
    className?: string;
}

class DrawerListItem extends React.Component<IDrawerListItemProps> {
    handleClick = (link: string) => () => {
        this.props.history.push(link);
    }

    render() {
        const { handleClick } = this;
        const { name, link, className } = this.props;
        const selected = window.location.pathname === link;
        return (
            <ListItem
                className={className}
                selected={selected}
                button={true}
                onClick={handleClick(link!)}
            >
                {this.props.children}
                <ListItemText primary={name}/>
            </ListItem>
        );
    }
}

export default withRouter(DrawerListItem);
