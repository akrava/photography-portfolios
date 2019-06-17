import React from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { MenuProps as MenuPropsType } from "@material-ui/core/Menu";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import classNames from "classnames";
import { onChangeEventType } from "@routes/Register";

const styles = () => createStyles({
    chip: {
        maxHeight: "1.18rem",
    }
});

interface IPhotosFormProps {
    apiRequestToPhotos: (
        limit: number, offset: number, query?: string, category?: string[],
        sortAsc?: boolean, widescreen?: boolean
    ) => void;
    limit: number;
    className?: string;
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
        stack: [] as IPhotosFormState[]
    };

    MenuProps: Partial<MenuPropsType> = {
        getContentAnchorEl: null,
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
        }
    };

    handleFieldChange = (event: onChangeEventType, field: string) => {
        const input = event.target;
        const newState = { ...this.state, [field]: input.value };
        this.handleChange(newState);
    }

    handleMultipleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const values = event.target.value as string[];
        const newState = { ...this.state, categories: values };
        this.handleChange(newState);
    }

    requestToApi = (state: IPhotosFormState) => {
        const { limit } = this.props;
        const { query, categories, sort, aspect } = state;
        const sortAsc = sort === "" ? undefined : sort === "Asc";
        const widescreen = aspect === "" || aspect === "All"
            ? undefined
            : state.aspect === "16:9";
        this.props.apiRequestToPhotos(limit, 0, query, categories, sortAsc, widescreen);
    }

    handleChange = (state: IPhotosFormState) => {
        let newState = { ...state, enablePost: false, stack: this.state.stack };
        if (!this.state.enablePost) {
            const stack = this.state.stack;
            stack.push(newState);
            newState = { ...newState, stack };
        } else {
            this.requestToApi(newState);
            window.setTimeout(() => {
                const lastChanges = this.state.stack.pop();
                if (lastChanges) {
                    this.requestToApi(this.state);
                }
                this.setState({ enablePost: true, stack: [] });
            }, 1000);
        }
        this.setState(newState);
    }

    render() {
        const { query, sort, aspect, categories } = this.state;
        const { handleFieldChange, handleMultipleChange, MenuProps } = this;
        const { chip } = this.props.classes;
        const { className } = this.props;
        return (
            <form className={className}>
                <Grid container={true} spacing={3}>
                    <Grid item={true} xl={6} lg={5} sm={12} xs={12}>
                        <TextField
                            className="input-item"
                            label="Search"
                            value={query}
                            onChange={(e) => handleFieldChange(e, "query")}
                            margin="none"
                            variant="standard"
                            type="text"
                        />
                    </Grid>
                    <Grid item={true} xl={4} lg={3} sm={6} xs={12}>
                        <FormControl className="input-item">
                            <InputLabel htmlFor="select-photo-category">Category</InputLabel>
                            <Select
                                inputProps={{ id: "select-photo-category" }}
                                multiple={true}
                                margin="none"
                                variant="standard"
                                value={categories}
                                onChange={handleMultipleChange}
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
                        </FormControl>
                    </Grid>
                    <Grid item={true} xl={1} lg={2} sm={3} xs={6}>
                        <TextField
                            select={true}
                            label="Aspect"
                            className="input-item"
                            margin="none"
                            variant="standard"
                            value={aspect}
                            onChange={(e) => handleFieldChange(e, "aspect")}
                            SelectProps={{ MenuProps }}
                        >
                            {["All", "16:9", "4:3"].map((x, i) => (
                                <MenuItem key={i} value={x}>
                                    {x}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item={true} xl={1} lg={2} sm={3} xs={6}>
                        <TextField
                            select={true}
                            label="Sort"
                            className="input-item"
                            margin="none"
                            variant="standard"
                            value={sort}
                            onChange={(e) => handleFieldChange(e, "sort")}
                            SelectProps={{ MenuProps }}
                        >
                            {["Asc", "Desc"].map((x, i) => (
                                <MenuItem key={i} value={x}>
                                    {x}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default withStyles(styles)(PhotosFormControl);
