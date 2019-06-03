import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Configs } from "@configs/general";
import { AppBar, Toolbar } from "@material-ui/core";
import ButtonPlain from "@components/controls/ButtonPlain";
import { WithStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Menu from "@components/header/Menu";
import MenuItem from "@components/header/MenuItem";
import SubMenu from "@components/header/SubMenu";


const styles = ({  }: Theme) => createStyles({
    root: {
        backgroundColor: "#ADB6EA",
        willChange: "transform"
    }
});

class Header extends React.Component<WithStyles<typeof styles>> {
    render() {
        return (
            <AppBar className={this.props.classes.root} position="sticky">
                <Toolbar className="header_toolbar">
                    <Link className="link header__link header__logo" to="/">
                        <ButtonPlain>
                            <img className="header__logo__img" alt={Configs.siteName} src="/logo.png" />
                        </ButtonPlain>
                    </Link>
                    <Menu>
                        <MenuItem subMenu={[
                            (<NavLink className="link" to="/hmm">
                                hmm
                            </NavLink>),
                            (<NavLink className="link" to="/hmm2">
                                hmm2
                            </NavLink>)
                        ]}>
                            <NavLink className="link header__link" to="/albums">
                                <ButtonPlain className="link__text">Albums</ButtonPlain>
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink className="link header__link" to="/about">
                                <ButtonPlain className="link__text">About</ButtonPlain>
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink className="link header__link" to="/contact">
                                <ButtonPlain className="link__text">Contact</ButtonPlain>
                            </NavLink>
                        </MenuItem>
                    </Menu>
                    <SubMenu />
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);
