import React from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { MenuProps as MenuPropsType } from "@material-ui/core/Menu";
import Chip from "@material-ui/core/Chip";
import classNames from "classnames";
import FormControls, { IFormValuesState } from "@components/controls/FormControls";
import FormControl from "@components/controls/FormControl";
import MultipleSelect from "@components/controls/MultipleSelect";

const styles = () => createStyles({
    chip: {
        maxHeight: "1.18rem",
    }
});

interface IPhotosFormProps {
    apiRequestToPhotos: (
        limit: number, offset: number, query?: string, category?: string[],
        sortAsc?: boolean, widescreen?: boolean, owner?: string
    ) => void;
    limit: number;
    className?: string;
    owner?: string;
}

export interface IPhotosFormState {
    query: string;
    categories: string[];
    aspect: string;
    sort: string;
}

class PhotosFormControl extends React.Component<IPhotosFormProps & WithStyles<typeof styles>> {
    state = {
        query: "",
        categories: [],
        aspect: "",
        sort: "",
        enablePost: true,
        wasChanged: false
    };

    MenuProps: Partial<MenuPropsType> = {
        getContentAnchorEl: null,
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
        }
    };

    handleUpdateState = (state: IFormValuesState) => {
        const { limit, owner } = this.props;
        const { query, category, sort, aspect } = state.values as any;
        const sortAsc = sort === "" ? undefined : sort === "Asc";
        const widescreen = aspect === "" || aspect === "All"
            ? undefined
            : aspect === "16:9";
        if (query && query.length < 2 && query.length !== 0) {
            return;
        }
        this.props.apiRequestToPhotos(limit, 0, query, category, sortAsc, widescreen, owner);
    }

    render() {
        const { handleUpdateState, MenuProps } = this;
        const { chip } = this.props.classes;
        const { className } = this.props;
        return (
            <FormControls
                apiRequest={handleUpdateState}
                className={className}
            >
                <FormControl
                    name="query"
                    xl={6} lg={5} sm={12} xs={12}
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
                    isMultipleSelect={true}
                    name="category"
                    xl={4} lg={3} sm={6} xs={12}
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
                            {["Photo", "Art", "Design"].map((option) => (
                                <MenuItem key={option} value={option.toLowerCase()}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </MultipleSelect>
                </FormControl>
                <FormControl
                    name="aspect"
                    xl={1} lg={2} sm={3} xs={6}
                >
                    <TextField
                        select={true}
                        label="Aspect"
                        className="input-item"
                        margin="none"
                        variant="standard"
                        SelectProps={{ MenuProps }}
                    >
                        {["All", "16:9", "4:3"].map((x, i) => (
                            <MenuItem key={i} value={x}>
                                {x}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
                <FormControl
                    name="sort"
                    xl={1} lg={2} sm={3} xs={6}
                >
                    <TextField
                        select={true}
                        label="Sort"
                        className="input-item"
                        margin="none"
                        variant="standard"
                        SelectProps={{ MenuProps }}
                    >
                        {["Asc", "Desc"].map((x, i) => (
                            <MenuItem key={i} value={x}>
                                {x}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
            </FormControls>
        );
    }
}

export default withStyles(styles)(PhotosFormControl);
