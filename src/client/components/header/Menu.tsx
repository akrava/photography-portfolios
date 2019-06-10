import React from "react";
import MenuDrawer, { IMenuDrawerProps } from "@components/header/MenuDrawer";

class Menu extends React.Component<IMenuDrawerProps> {
    render() {
        const { drawerIsOpened, toggleDrawer, userObject } = this.props;
        return (
            <>
                <nav role="navigation" className="header__menu">
                    <ul className="menu__list">
                        {this.props.children}
                    </ul>
                </nav>
                <MenuDrawer
                    userObject={userObject}
                    toggleDrawer={toggleDrawer}
                    drawerIsOpened={drawerIsOpened}
                >
                    {this.props.children}
                </MenuDrawer>
            </>
        );
    }
}

export default Menu;
