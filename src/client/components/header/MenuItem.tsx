import * as React from "react";

export interface IMenuItemProps {
    subMenu?: JSX.Element[];
}

class MenuItem extends React.Component<IMenuItemProps> {
    mainItem = () => {
        if (!this.props.subMenu) {
            return this.props.children;
        }
        return React.Children.map(this.props.children, (child) =>
            React.cloneElement(child! as React.ReactElement, { "aria-haspopup": "true" })
        );
    }

    subMenu = () => {
        if (!this.props.subMenu) {
            return false;
        }
        const items = this.props.subMenu;
        return (
            <ul className="menu__dropdown" aria-label="submenu">
                {items.map((child, i) => <li className="dropdown__item" key={i}>{child}</li>)}
            </ul>
        );
    }

    render() {
        return (
            <li className="menu__item">
                {this.props.children}
                {this.subMenu()}
            </li>
        );
    }
}

export default MenuItem;
