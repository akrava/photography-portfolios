import React from "react";
//import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

class NotAuthorized extends React.Component {
    render() {
        return (
            <>
            <p>
                401: Not Authorized
            </p>
            <Link to="/">Home</Link>
            </>
        );
    }
}

export default NotAuthorized;
