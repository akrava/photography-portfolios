import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import StyledMenu from "@components/controls/StyledMenu";
import StyledMenuItem from "@components/controls/StyledMenuItem";
import ButtonPlain from "@components/controls/ButtonPlain";
import { IMenuLink } from "@components/header/MenuItem";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

export interface ISubMenuProps {
    name: string;
    menu: IMenuLink[];
}

class SubMenu extends React.Component<ISubMenuProps & RouteComponentProps> {
    state = {
        anchorEl: null,
        textCurrentLink: null
    };

    componentDidUpdate() {
        this.highlitActiveSubMenuLink();
    }

    componentDidMount() {
        this.highlitActiveSubMenuLink();
    }

    highlitActiveSubMenuLink = () => {
        const { menu, name } = this.props;
        const subMenuLink = document.getElementById(`sub-menu-${name}`)!.parentElement!;
        const show = menu.some((x) => window.location.pathname === x.link);
        subMenuLink.classList.toggle("header__link_active", show);
    }

    handleClick = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ anchorEl: event.currentTarget });
        const wrapper = event.currentTarget.parentElement!;
        wrapper.classList.toggle("header__link_selected", true);
    }

    handleClose = () => {
        const button: HTMLButtonElement = this.state.anchorEl!;
        button.parentElement!.classList.toggle("header__link_selected", false);
        this.setState({ anchorEl: null });
    }

    handleOpenLink = (link: string) => {
        this.handleClose();
        this.props.history.push(link);
    }

    renderSubMenuItems = () => {
        return this.props.menu.map((x, i) => {
            let className = "submenu__link link";
            if (window.location.pathname === x.link) {
                className += " submenu__link_active";
            }
            return (
                <StyledMenuItem
                    onClick={() => this.handleOpenLink(x.link!)}
                    key={i}
                >
                    <ListItemText
                        className={className}
                        primary={x.name}
                    />
                </StyledMenuItem>
            );
        });
    }

    render() {
        const { name } = this.props;
        const { anchorEl } = this.state;
        const { handleClick, handleClose, renderSubMenuItems } = this;
        return (
            <>
                <ButtonPlain
                    className="header-link__text"
                    id={`sub-menu-${name}`}
                    aria-controls={`customized-menu-${name}`}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    {name}
                </ButtonPlain>
                <StyledMenu
                    id={`customized-menu-${name}`}
                    anchorEl={anchorEl}
                    keepMounted={true}
                    open={!!anchorEl}
                    onClose={handleClose}
                >
                    {renderSubMenuItems()}
                </StyledMenu>
            </>
        );
    }
}

export default withRouter(SubMenu);
