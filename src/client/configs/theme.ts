import { createMuiTheme } from "@material-ui/core/styles";

const palette = {
    primary: { main: "#3F51B5", contrastText: "#ffffff" },
    secondary: { main: "#5E35B1", contrastText: "#ffffff" }
};

export default createMuiTheme({ palette, typography: { useNextVariants: true } });
