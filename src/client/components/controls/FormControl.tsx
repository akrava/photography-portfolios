import React from "react";
import Grid, { GridSize } from "@material-ui/core/Grid";
import { BaseTextFieldProps } from "@material-ui/core/TextField";
import { SelectProps } from "@material-ui/core/Select";

export interface IFormControlProps {
    xl?: GridSize;
    lg?: GridSize;
    sm?: GridSize;
    md?: GridSize;
    xs?: GridSize;
    name: string;
    isMultipleSelect?: boolean;
    value?: unknown;
    onChange?: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement |
        { name?: string; value: unknown }
    >;
}

class FormControl extends React.Component<IFormControlProps> {
    render() {
        const { xl, lg, sm, xs, md, children, value, onChange } = this.props;
        return (
            <Grid item={true} xl={xl} md={md} lg={lg} sm={sm} xs={xs}>
                {children && React.Children.map(children, (item) => {
                    if (React.isValidElement<BaseTextFieldProps>(item)) {
                        return React.cloneElement(item, { value, onChange });
                    } else if (React.isValidElement<SelectProps>(item)) {
                        return React.cloneElement(item, { value, onChange });
                    }
                    return null;
                })}
            </Grid>
        );
    }
}

export default FormControl;
