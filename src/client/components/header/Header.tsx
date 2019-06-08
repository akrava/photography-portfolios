import React from "react";
import { Link } from "react-router-dom";
import { Configs } from "@configs/general";
import { AppBar, Toolbar } from "@material-ui/core";
import ButtonPlain from "@components/controls/ButtonPlain";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import Menu from "@components/header/Menu";
import MenuItem from "@components/header/MenuItem";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = () => createStyles({
    root: {
        backgroundColor: "#ADB6EA"
    },
    buttonLogin: {
        color: "#060a51",
        borderColor: "#180b59",
        "&:hover": {
            color: "#001587",
            borderColor: "#033b78",
        },
        "&:active": {
            color: "#1409b9",
            borderColor: "#212299",
        },
    },
    buttonRegister: {
        color: "#580b8f",
        borderColor: "#6601a4",
        "&:hover": {
            color: "#72109e",
            borderColor: "#7a18a5",
        },
        "&:active": {
            color: "#7919d4",
            borderColor: "#7d0fd7",
        },
    },
    buttonMenu: {
        color: "#361071"
    }
});

class Header extends React.Component<WithStyles<typeof styles>> {
    state = {
        drawerIsOpened: false,
    };

    toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (event && event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }
        this.setState({ drawerIsOpened: open });
    }

    render() {
        const { toggleDrawer } = this;
        const { drawerIsOpened } = this.state;
        const { root, buttonLogin, buttonRegister, buttonMenu } = this.props.classes;
        return (
            <AppBar className={classNames(root, "header")} position="sticky">
                <Toolbar>
                    <div className="header__menu-button">
                        <IconButton
                            className={buttonMenu}
                            aria-label="Open drawer"
                            edge="start"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <Link className="header-logo link header__link" to="/">
                        <ButtonPlain className="header-logo__button">
                            <img
                                className="header-logo__img"
                                alt={Configs.siteName}
                                src="/logo.png"
                            />
                        </ButtonPlain>
                    </Link>
                    <Menu drawerIsOpened={drawerIsOpened} toggleDrawer={toggleDrawer}>
                        <MenuItem
                            name="Albums"
                            subMenu={[
                                { name: "All", link: "/all" },
                                { name: "Something", link: "/sdfgdfg" },
                                { name: "Hello", link: "/kjs" },
                                { name: "Uhh bb n", link: "/rey" }
                            ]}
                        />
                        <MenuItem name="About" link="/about" />
                        <MenuItem name="Contact" link="/contact" />
                    </Menu>
                    <div className="header__buttons-group">
                        <Link className="link header__button" to="/login">
                            <Button
                                className={buttonLogin}
                                variant="outlined"
                                color="secondary"
                            >
                                Login
                            </Button>
                        </Link>
                        <Link className="link header__button" to="/register">
                            <Button
                                className={buttonRegister}
                                variant="outlined"
                                color="default"
                            >
                                Register
                            </Button>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);
