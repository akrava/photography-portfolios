import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import theme from "@configs/theme";
import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import Main from "@components/main/Main";
import ScrollToTop from "@components/service/ScrollToTop";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "@configs/configureReduxStore";
import { Configs } from "@configs/general";

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <SnackbarProvider maxSnack={Configs.maxSnackOnPage}>
                    <MuiThemeProvider theme={theme}>
                        <BrowserRouter>
                            <ScrollToTop>
                                <CssBaseline />
                                <Header />
                                <Main />
                                <Footer />
                            </ScrollToTop>
                        </BrowserRouter>
                    </MuiThemeProvider>
                </SnackbarProvider>
            </Provider>
        );
    }
}

export default App;
