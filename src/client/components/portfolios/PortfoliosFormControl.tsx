import React from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import FormControls, { IFormValuesState } from "@components/controls/FormControls";
import FormControl from "@components/controls/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MultipleSelect from "@components/controls/MultipleSelect";
import { MenuProps as MenuPropsType } from "@material-ui/core/Menu";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";

const styles = () => createStyles({
    chip: {
        maxHeight: "1.18rem",
    }
});

interface IPortfoliosFormControl extends WithStyles<typeof styles> {
    handleUpdateState: (state: IFormValuesState) => void;
    category?: string;
}

class PortfoliosFormControl extends React.Component<IPortfoliosFormControl> {
    MenuProps: Partial<MenuPropsType> = {
        getContentAnchorEl: null,
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
        }
    };

    render() {
        const { MenuProps } = this;
        const { handleUpdateState, category } = this.props;
        const { chip } = this.props.classes;
        const values = category && { category: [category] } || undefined;
        return (
            <FormControls
                apiRequest={handleUpdateState}
                className="photos__controls"
                valuesDefault={values}
            >
                <FormControl
                    name="query"
                    xs={12} md={6} xl={8} lg={8} sm={12}
                >
                    <TextField
                        className="input-item"
                        label="Search"
                        margin="none"
                        variant="standard"
                        type="text"
                    />
                </FormControl>
                <FormControl
                    name="category"
                    xs={12} md={6} xl={4} lg={4} sm={12}
                    isMultipleSelect={true}
                >
                    <MultipleSelect name="Category">
                        <Select
                            inputProps={{ id: "select-photo-category" }}
                            multiple={true}
                            margin="none"
                            variant="standard"
                            renderValue={(selected) => (
                                <div className="input-item__chip-group">
                                    {(selected as string[]).map((x) => (
                                        <Chip
                                            key={x}
                                            label={x}
                                            className={classNames("input-item__chip", chip)}
                                        />
                                    ))}
                                </div>
                            )}
                            MenuProps={{ ...MenuProps }}
                        >
                            {["Photographer", "Artist", "Designer"].map((option) => (
                                <MenuItem key={option} value={option.toLowerCase()}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </MultipleSelect>
                </FormControl>
            </FormControls>
        );
    }
}

export default withStyles(styles)(PortfoliosFormControl);
