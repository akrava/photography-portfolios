import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import PresentationalPage from "@components/special/PresentationalPage";
import StyledInput from "@components/controls/StyledInput";

const styles = () => createStyles({
    checkbox: {
        color: "rgba(255,255,255,0.87)",
    },
    checkboxLabel: {
        color: "rgba(255,255,255,0.87)",
    },
    buttonLabel: {
        textTransform: "none",
    }
});

class Login extends React.Component<WithStyles<typeof styles>> {
    render() {
        const { classes } = this.props;
        return (
            <PresentationalPage classNameRoot="presentational_login">
                <form>
                    <StyledInput variant="filled" label={"Username"}  />
                    <StyledInput variant="filled" label={"Password"} type={"password"} />
                    <FormControl margin={"normal"} fullWidth={true}>
                        <Button
                            classes={{ label: classes.buttonLabel }}
                            fullWidth={true}
                            variant={"contained"}
                            color={"primary"}
                        >
                            Log in
                        </Button>
                    </FormControl>
                    <div className="presentational__additional-info">
                        <Typography color={"inherit"}>
                            <Link to="/register" className="link presentational__link">
                                Not registered yet? Sign up
                            </Link>
                        </Typography>
                    </div>
                </form>
            </PresentationalPage>
        );
    }
}

export default withStyles(styles)(Login);
