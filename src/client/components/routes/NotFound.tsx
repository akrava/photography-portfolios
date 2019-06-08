import React from "react";
//import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
    render() {
        return (
            <>
            <p>
                404: Not Found
            </p>
            <Link to="/">Home</Link>
            </>
        );
    }
}

export default NotFound;
