import React from "react";
import Photos from "@routes/Photos";
import { withRouter, RouteComponentProps } from "react-router-dom";

class Portfolio extends React.Component<RouteComponentProps<{ login: string }>> {
    render() {
        const login = this.props.match.params.login;
        return <Photos ownerId={login} />;
    }
}

export default withRouter(Portfolio);
