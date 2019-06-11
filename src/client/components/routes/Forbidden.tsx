import React from "react";
//import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

class Forbidden extends React.Component {
    render() {
        return (
            <>
            <p>
                403: Forbidden
            </p>
            <Link to="/">Home</Link>
            </>
        );
    }
}

export default Forbidden;
