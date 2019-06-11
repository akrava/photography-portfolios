import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import PresentationalPage from "@components/special/PresentationalPage";
import StyledInput from "@components/controls/StyledInput";
import { IApplicationStore } from "@configs/configureReduxStore";
import { register, IUserState, UserThunkDispatch } from "@actions/user";

export const styles = () => createStyles({
    checkbox: {
        color: "rgba(255,255,255,0.87)",
    },
    checkboxLabel: {
        color: "rgba(255,255,255,0.87)",
    },
    buttonLabel: {
        textTransform: "none",
    },
    buttonDisabled: {
        color: "#9b9b9bd6 !important",
        backgroundColor: "#222848e6 !important"
    }
});

export type onChangeEventType = React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export interface IStringKVP { [key: string]: string; }

interface IFormInputs {
    fullname: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export function isValidForm(arrayErrorObjects: IStringKVP[]) {
    for (const objetct of arrayErrorObjects) {
        for (const value in objetct) {
            if (objetct[value] !== "") {
                return false;
            }
        }
    }
    return true;
}

export function getSummaryErrorObject(arrayErrorObjects: IStringKVP[]) {
    return arrayErrorObjects.reduce((prevObject, currentObject) => (
        { ...prevObject, ...currentObject }
    ), {});
}

interface IRegisterProps {
    user: IUserState;
    register: (
        fullname: string, username: string, password: string, isPhotographer: boolean
    ) => void;
}

class Register extends React.Component<IRegisterProps & WithStyles<typeof styles>> {
    static mapStateToProps(store: IApplicationStore) {
        return { user: store.user };
    }

    static mapDispatchToProps(dispatch: UserThunkDispatch) {
        return {
            register: (
                fullname: string, username: string, password: string, isPhotographer: boolean
            ) => dispatch(register(fullname, username, password, isPhotographer))
        };
    }

    state = {
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        isPhotographer: false,
        error: {
            fullnameE: "",
            usernameE: "",
            passwordE: "",
            confirmPasswordE: ""
        },
        submitEnabled: true,
        checkSubmit: false
    };

    setButtonStatus = (state: IFormInputs) => {
        const errorObjects = this.formCheckValidity(state);
        return { submitEnabled: isValidForm(errorObjects) };
    }

    handleFieldChange = (event: onChangeEventType, field: string) => {
        const input = event.target;
        const newState = { ...this.state, [field]: input.value };
        const errorObj = this.checkValidityInput(field, input.value, newState);
        let additionalObj = {};
        if (this.state.checkSubmit) {
            additionalObj = this.setButtonStatus({ ...newState });
        }
        this.setState({
            ...newState,
            error: {
                ...this.state.error,
                ...errorObj
            },
            ...additionalObj
        });
    }

    formCheckValidity = (state: IFormInputs) => {
        const { fullname, username, password, confirmPassword } = state;
        const inputs = [
            { f: "fullname", v: fullname }, { f: "username", v: username },
            { f: "password", v: password }, { f: "confirmPassword", v: confirmPassword }
        ];
        return inputs.map((x) => (this.checkValidityInput(x.f, x.v, state)));
    }

    checkValidityInput(field: string, value: string, state: IFormInputs): IStringKVP {
        let errObj = {};
        const { password, confirmPassword } = state;
        switch (field) {
            case "fullname": {
                if (!value.match(/^[\s\S]{3,30}$/)) {
                    errObj = {
                        fullnameE: "Length of fullname should be between 3 and 30"
                    };
                } else {
                    errObj = { fullnameE: "" };
                }
                break;
            }
            case "username": {
                if (!value.match(/^[A-Za-z_0-9]{5,20}$/)) {
                    errObj = {
                        usernameE: "Only A-Za-z_0-9, length between 5 and 20"
                    };
                } else {
                    errObj = { usernameE: "" };
                }
                break;
            }
            case "password": {
                if (!value.match(/^[\s\S]{8,30}$/)) {
                    errObj = {
                        passwordE: "Length of password should be between 8 and 30"
                    };
                } else {
                    errObj = { passwordE: "" };
                }
                if (confirmPassword && (!confirmPassword.match(/^[\s\S]{8,30}$/)
                    || value !== confirmPassword
                )) {
                    errObj = {
                        ...errObj,
                        confirmPasswordE: "Passwords don't match or this one is invalid"
                    };
                } else if (confirmPassword && value === confirmPassword) {
                    errObj = {
                        ...errObj,
                        confirmPasswordE: ""
                    };
                }
                break;
            }
            case "confirmPassword": {
                if (!value.match(/^[\s\S]{8,30}$/) || password !== value) {
                    errObj = {
                        confirmPasswordE: "Passwords don't match or this one is invalid"
                    };
                } else {
                    errObj = { confirmPasswordE: "" };
                }
                break;
            }
        }
        return errObj;
    }

    handleIsPhotographerChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.currentTarget!;
        this.setState({ isPhotographer: input.checked });
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errorObjects = this.formCheckValidity(this.state);
        if (isValidForm(errorObjects) === false) {
            event.stopPropagation();
            this.setState({
                checkSubmit: true,
                submitEnabled: false,
                error: {
                    ...getSummaryErrorObject(errorObjects)
                }
            });
            return;
        }
        const { fullname, password, username, isPhotographer } = this.state;
        this.props.register(fullname, username, password, isPhotographer);
    }

    render() {
        const { handleFieldChange, handleIsPhotographerChanged, handleSubmit } = this;
        const {
            fullname, username, password, confirmPassword, isPhotographer, submitEnabled
        } = this.state;
        const { fullnameE, usernameE, passwordE, confirmPasswordE } = this.state.error;
        const { classes } = this.props;
        const { isFetching, isLogined } = this.props.user;
        if (isLogined) {
            return <Redirect to="/" />;
        }
        return (
            <PresentationalPage classNameRoot="presentational_register">
                <form onSubmit={handleSubmit}>
                    <StyledInput
                        error={!!fullnameE}
                        helperText={fullnameE}
                        onChange={(e) => handleFieldChange(e, "fullname")}
                        value={fullname}
                        variant="filled"
                        label={"Fullname"}
                    />
                    <StyledInput
                        onChange={(e) => handleFieldChange(e, "username")}
                        error={!!usernameE}
                        helperText={usernameE}
                        value={username}
                        variant="filled"
                        label={"Username"}
                    />
                    <StyledInput
                        onChange={(e) => handleFieldChange(e, "password")}
                        error={!!passwordE}
                        helperText={passwordE}
                        value={password}
                        variant="filled"
                        label={"Password"}
                        type={"password"}
                    />
                    <StyledInput
                        onChange={(e) => handleFieldChange(e, "confirmPassword")}
                        error={!!confirmPasswordE}
                        helperText={confirmPasswordE}
                        value={confirmPassword}
                        variant="filled"
                        label={"Confirm password"}
                        type={"password"}
                    />
                    <FormControl fullWidth={true}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={handleIsPhotographerChanged}
                                checked={isPhotographer}
                                color={"primary"}
                                value="checkedC"
                                className={classes.checkbox}
                            />
                        }
                        label="Create a portfolio"
                        classes={{
                            label: classes.checkboxLabel,
                        }}
                    />
                    </FormControl>
                    <div className="register__button">
                        <FormControl margin={"normal"} fullWidth={true}>
                            <Button
                                classes={{
                                    label: classes.buttonLabel,
                                    disabled: classes.buttonDisabled
                                }}
                                fullWidth={true}
                                variant={"contained"}
                                color={"primary"}
                                disabled={!submitEnabled || isFetching}
                                type="submit"
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

export default connect(Register.mapStateToProps, Register.mapDispatchToProps)
    (withStyles(styles)(Register));
