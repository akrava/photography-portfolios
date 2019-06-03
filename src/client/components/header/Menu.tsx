import React from "react";

class Menu extends React.Component {
    render() {
        return (
            <nav role="navigation" className="header__menu">
                <ul className="menu__list">
                    {this.props.children}
                </ul>
            </nav>
        );
    }
}

export default Menu;
