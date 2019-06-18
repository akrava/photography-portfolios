import React from "react";
import Typography from "@material-ui/core/Typography";

class About extends React.Component {
    render() {
        return (
            <>
                <h1 className="heading">
                    About
                </h1>
                <Typography className="body-text" variant="body1" id="photos-gallarey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
                </Typography>
                <div className="about-block">
                    <figure className="about-block__fig">
                        <img
                            alt="animals protest"
                            className="about-block__img"
                            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_" +
                            "YfIT4usqs_GWTNaA9f22PaV8WYgq_U0xTrVEO8Kv8Hh5ho7P"}
                        />
                        <figcaption className="about-block__cap">Our banner</figcaption>
                    </figure>
                    <Typography className="body-text" variant="body1" id="photos-gallarey">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod  tempor incididunt ut labore
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                    </Typography>
                </div>
            </>
        );
    }
}

export default About;
