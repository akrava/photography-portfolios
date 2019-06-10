import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import PresentationalPage from "@components/special/PresentationalPage";
import StyledInput from "@components/controls/StyledInput";
import { IApplicationStore } from "@configs/configureReduxStore";
import { authenticate, IUserState, UserThunkDispatch } from "@actions/user";
import {
    isValidForm, getSummaryErrorObject, onChangeEventType, IStringKVP, styles
} from "@components/routes/Register";

export interface IFormInputs {
    username: string;
    password: string;
}

interface ILoginProps {
    user: IUserState;
    login: (username: string, password: string) => void;
}

class Login extends React.Component<ILoginProps & WithStyles<typeof styles>> {
    static mapStateToProps(store: IApplicationStore) {
        return { user: store.user };
    }

    static mapDispatchToProps(dispatch: UserThunkDispatch) {
        return {
            login: (username: string, password: string) =>
                dispatch(authenticate(username, password))
        };
    }

    state = {
        username: "",
        password: "",
        error: {
            usernameE: "",
            passwordE: "",
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
        const errorObj = this.checkValidityInput(field, input.value);
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
        const { username, password } = state;
        const inputs = [
            { f: "username", v: username }, { f: "password", v: password }
        ];
        return inputs.map((x) => (this.checkValidityInput(x.f, x.v)));
    }

    checkValidityInput(field: string, value: string): IStringKVP {
        let errObj = {};
        switch (field) {
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
                break;
            }
        }
        return errObj;
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
        const { password, username } = this.state;
        this.props.login(username, password);
    }

    render() {
        const { handleFieldChange, handleSubmit } = this;
        const { username, password, submitEnabled } = this.state;
        const { usernameE, passwordE } = this.state.error;
        const { classes } = this.props;
        const { isFetching } = this.props.user;
        return (
            <PresentationalPage classNameRoot="presentational_login">
                <form onSubmit={handleSubmit}>
                    <StyledInput
                        variant="filled"
                        label={"Username"}
                        value={username}
                        error={!!usernameE}
                        helperText={usernameE}
                        onChange={(e) => handleFieldChange(e, "username")}
                    />
                    <StyledInput
                        variant="filled"
                        label={"Password"}
                        type={"password"}
                        value={password}
                        error={!!passwordE}
                        helperText={passwordE}
                        onChange={(e) => handleFieldChange(e, "password")}
                    />
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

export default connect(Login.mapStateToProps, Login.mapDispatchToProps)
    (withStyles(styles)(Login));
