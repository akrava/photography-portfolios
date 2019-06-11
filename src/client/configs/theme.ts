import { createMuiTheme } from "@material-ui/core/styles";

const palette = {
    primary: { main: "#3F51B5", contrastText: "#ffffff" },
    secondary: { main: "#5E35B1", contrastText: "#ffffff" }
};

const breakpointValues = {
    xs: 0,
    sm: 576,
    md: 790,
    lg: 992,
    xl: 1200,
};

export default createMuiTheme({ palette, breakpoints: { values: breakpointValues } });
