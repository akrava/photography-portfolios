import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Router } from "react-router-dom";
import history from "@configs/configureRouterHistory";
import theme from "@configs/theme";
import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import Main from "@components/main/Main";
import ScrollToTop from "@components/service/ScrollToTop";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "@configs/configureReduxStore";
import { Configs } from "@configs/general";
import ErrorBoundary from "@components/service/ErrorBoundary";
import SnackbarMessages from "@components/service/SnackbarMessages";

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <SnackbarProvider maxSnack={Configs.maxSnackOnPage}>
                    <MuiThemeProvider theme={theme}>
                        <Router history={history}>
                            <ScrollToTop>
                                <CssBaseline />
                                <ErrorBoundary>
                                    <SnackbarMessages />
                                    <Header />
                                    <Main />
                                    <Footer />
                                </ErrorBoundary>
                            </ScrollToTop>
                        </Router>
                    </MuiThemeProvider>
                </SnackbarProvider>
            </Provider>
        );
    }
}

export default App;
