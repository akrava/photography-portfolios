import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "@route/home/Home";
import Contact from "@route/contact/Contact";
import About from "@route/about/About";
import NotFound from "@route/service/NotFound";
import Breadcrumbs from "@components/special/Breadcrumbs";

class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact={true} path="/" />
                    <Route component={Breadcrumbs} />
                </Switch>
                <Switch>
                    <Route exact={true} path="/" component={Home} />
                    <Route exact={true} path="/about" component={About} />
                    <Route exact={true} path="/contact" component={Contact} />
                    <Route component={NotFound} />
                </Switch>
            </main>
        );
    }
}

export default Main;
