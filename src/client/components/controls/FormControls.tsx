import React from "react";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { onChangeEventType } from "@routes/Register";
import { IFormControlProps } from "@components/controls/FormControl";

interface IFormControlsProps {
    apiRequest: (state: IFormValuesState) => void;
    className?: string;
    spacing?: GridSpacing;
    valuesDefault?: IFormValuesState;
}

export interface IFormValuesState {
    [key: string]: unknown;
}

function setWithEmptyArrays(props: React.Props<{}> & IFormControlsProps) {
    const { children } = props;
    let response = {};
    if (children) {
        React.Children.forEach(children, (item) => {
            if (React.isValidElement<IFormControlProps>(item)) {
                if (props.valuesDefault && props.valuesDefault[item.props.name]) {
                    response = {
                        ...response,
                        [item.props.name]: props.valuesDefault[item.props.name]
                    };
                } else {
                    if (item.props.isMultipleSelect === true) {
                        response = { ...response, [item.props.name]: [] };
                    } else {
                        response = { ...response, [item.props.name]: "" };
                    }
                }

            }
        });
    }
    return response;
}

class FormControls extends React.Component<IFormControlsProps> {
    state = {
        values: setWithEmptyArrays(this.props) as IFormValuesState,
        enablePost: true,
        wasChanged: false
    };

    handleFieldChange = (event: onChangeEventType, field: string) => {
        const input = event.target;
        const newState = { ...this.state, values: { ...this.state.values, [field]: input.value } };
        this.handleChange(newState);
        console.log(field, input.value);
    }

    handleChange = (state: IFormValuesState) => {
        let newState = { ...state, enablePost: false, wasChanged: this.state.wasChanged };
        if (!this.state.enablePost) {
            newState = { ...newState, wasChanged: true };
        } else {
            this.props.apiRequest(newState);
            window.setTimeout(() => {
                if (this.state.wasChanged) {
                    this.props.apiRequest(this.state);
                }
                this.setState({ enablePost: true, wasChanged: false });
            }, 1000);
        }
        this.setState(newState);
    }

    render() {
        const { handleFieldChange } = this;
        const { className, spacing, children } = this.props;
        return (
            <form className={className}>
                <Grid container={true} spacing={spacing || 3}>
                    {children && React.Children.map(children, (item, i) => {
                        if (React.isValidElement<IFormControlProps>(item)) {
                            return React.cloneElement(item, {
                                key: i,
                                value: this.state.values[item.props.name],
                                onChange: (e: onChangeEventType) => handleFieldChange(e, item.props.name)
                            });
                        }
                        return null;
                    }
                    )}
                </Grid>
            </form>
        );
    }
}

export default FormControls;
