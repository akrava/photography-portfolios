import React from "react";
import { Switch, Route } from "react-router-dom";

class Footer extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path="/(login|register)/" />
                <Route>
                    <footer className="footer">
                        <p className="footer__text">
                            Powered by Arkadiy Krava
                        </p>
                    </footer>
                </Route>
            </Switch>
        );
    }
}

export default Footer;
