import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import { SelectProps } from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

class MultipleSelect extends React.Component<SelectProps> {
    render() {
        const { name, children, value, onChange } = this.props;
        return (
            <FormControl className="input-item">
                <InputLabel htmlFor="select-photo-category">{name}</InputLabel>
                {children && React.Children.map(children, (item) => {
                    if (React.isValidElement<SelectProps>(item)) {
                        return React.cloneElement(item, { value, onChange });
                    }
                    return null;
                })}
            </FormControl>
        );
    }
}

export default MultipleSelect;
