import React from "react";
import { NavLink } from "react-router-dom";
import ButtonPlain from "@components/controls/ButtonPlain";
import SubMenu from "@components/header/SubMenu";
import DrawerListSubMenu from "@components/header/DrawerListSubMenu";
import DrawerListItem from "@components/header/DrawerListItem";
import withWidth, { WithWidthProps, isWidthUp } from "@material-ui/core/withWidth";
import { withRouter, RouteComponentProps } from "react-router-dom";

export interface IMenuLink {
    name: string;
    link?: string;
}

export interface IMenuItemProps extends IMenuLink {
    subMenu?: IMenuLink[];
}

class MenuItem extends React.Component<IMenuItemProps & WithWidthProps & RouteComponentProps> {
    menuLink = (name: string, link: string) => {
        if (isWidthUp("md", this.props.width!)) {
            return (
                <NavLink
                    activeClassName="header__link_active"
                    className="link header__link"
                    to={link}
                >
                    <ButtonPlain className="header-link__text">{name}</ButtonPlain>
                </NavLink>
            );
        }
        return (
            <DrawerListItem name={name} link={link}/>
        );
    }

    menuLinkWithSubMenu = () => {
        const { subMenu, name } = this.props;
        if (isWidthUp("md", this.props.width!)) {
           return <SubMenu name={name} menu={subMenu!} />;
        }
        return <DrawerListSubMenu name={name} menu={subMenu!} />;
    }

    render() {
        const { menuLinkWithSubMenu, menuLink } = this;
        const { name, link } = this.props;
        let item;
        if (typeof link !== "string") {
            item = menuLinkWithSubMenu();
        } else {
            item = menuLink(name, link);
        }
        if (isWidthUp("md", this.props.width!)) {
            return <li className="menu__item">{item}</li>;
        }
        return item;
    }
}

export default withWidth({ withTheme: true })(withRouter(MenuItem));
