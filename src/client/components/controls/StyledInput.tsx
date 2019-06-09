import React from "react";
import TextField, { FilledTextFieldProps } from "@material-ui/core/TextField";
import { WithStyles, withStyles, createStyles, Theme } from "@material-ui/core/styles";

const styles = ({ palette }: Theme) => createStyles({
    input: {
        background: "rgba(255,255,255,0.16)",
        "&:hover": {
            background: "rgba(255,255,255,0.24)",
        },
        "&$focused": {
            background: "rgba(255,255,255,0.24)",
        },
    },
    inputInput: {
        color: "#ffffff",
    },
    underline: {
        "&:after": {
            borderColor: palette.primary.light,
        },
    },
    focused: {},
    inputLabel: {
        color: "#ffffff",
        opacity: 0.8,
        "&$focused": {
            opacity: 1,
            color: "#ffffff",
        },
    },
});

class StyledInput extends React.Component<FilledTextFieldProps & WithStyles<typeof styles>> {
    render() {
        const { classes } = this.props;
        return (
            <TextField
                fullWidth={true}
                margin={"normal"}
                variant="filled"
                {...this.props}
                InputLabelProps={{
                    classes: {
                        root: classes.inputLabel,
                        focused: classes.focused,
                    },
                }}
                InputProps={{
                    classes: {
                        root: classes.input,
                        focused: classes.focused,
                        underline: classes.underline,
                        input: classes.inputInput
                    },
                }}
            />
        );
    }
}

export default withStyles(styles)(StyledInput);
