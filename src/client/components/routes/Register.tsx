import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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

class Register extends React.Component<WithStyles<typeof styles>> {
    render() {
        const { classes } = this.props;
        return (
            <PresentationalPage classNameRoot="presentational_register">
                <form>
                    <StyledInput variant="filled" label={"Fullname"}  />
                    <StyledInput variant="filled" label={"Username"}  />
                    <StyledInput variant="filled" label={"Password"} type={"password"} />
                    <StyledInput variant="filled" label={"Confirm password"} type={"password"} />
                    <FormControl fullWidth={true}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color={"primary"}
                                value="checkedC"
                                className={classes.checkbox}
                            />
                        }
                        label="Create an account of photographer"
                        classes={{
                            label: classes.checkboxLabel,
                        }}
                    />
                    </FormControl>
                    <div className="register__button">
                        <FormControl margin={"normal"} fullWidth={true}>
                            <Button
                                classes={{ label: classes.buttonLabel }}
                                fullWidth={true}
                                variant={"contained"}
                                color={"primary"}
                            >
                            Sign up
                            </Button>
                        </FormControl>
                    </div>
                    <div className="presentational__additional-info">
                        <Typography color={"inherit"}>
                            <Link to="/login" className="link presentational__link">
                                Have an account already? Sign in
                            </Link>
                        </Typography>
                    </div>
                </form>
            </PresentationalPage>
        );
    }
}

export default withStyles(styles)(Register);
