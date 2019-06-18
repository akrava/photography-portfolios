import React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IApplicationStore } from "@configs/configureReduxStore";
import { getAll, IUserState, UserThunkDispatch } from "@actions/user";
import Pagination from "@components/controls/Pagination";
import LoadingSplashScreen from "@components/special/LoadingSplashScreen";
import Typography from "@material-ui/core/Typography";
import PortfoliosFormControl from "@components/portfolios/PortfoliosFormControl";
import PortfolioCard from "@components/portfolios/PortfolioCard";
import Grid from "@material-ui/core/Grid";
import { IFormValuesState } from "@components/controls/FormControls";

interface IPhotosProps {
    user: IUserState;
    getAll: (
        limit: number, offset: number, query?: string, category?: string[],
    ) => void;
}

interface IPortfoliosState  {
    limit: number;
    offset: number;
    query?: string;
    category?: string[];
    prevPath: string;
}

class Portfolios extends React.Component<
    IPhotosProps & RouteComponentProps, IPortfoliosState
> {
    static mapStateToProps(store: IApplicationStore) {
        return { user: store.user };
    }

    static mapDispatchToProps(dispatch: UserThunkDispatch) {
        return {
            getAll: (
                limit: number, offset: number, query?: string, category?: string[],
            ) => dispatch(getAll(limit, offset, query, category))
        };
    }

    state: IPortfoliosState = {
        limit: 9,
        offset: 0,
        prevPath: this.props.location.pathname
    };

    getCategory(path: string) {
        const n = path.lastIndexOf("/");
        const res = path.substring(n + 1);
        return res === "" ? res : res.slice(0, -1);
    }

    loadPortfolios = () => {
        const path = this.props.location.pathname;
        const category = this.getCategory(path);
        console.log(category);
        this.props.getAll(this.state.limit, 0, "", category ? [ category ] : undefined);
    }

    componentDidMount() {
        this.loadPortfolios();
    }

    componentDidUpdate() {
        if (this.state.prevPath !== this.props.location.pathname) {
            this.loadPortfolios();
            this.setState({ prevPath: this.props.location.pathname });
        }
    }

    changePage = (offset: number) => {
        const newState = { ...this.state, offset };
        this.upadatePhotos(newState);
        this.setState(newState);
    }

    upadatePhotos = (state: IPortfoliosState) => {
        const { limit, offset } = state;
        const { query, category } = this.props.user;
        this.props.getAll(limit, offset, query, category);
        this.jumpToTop("portfolios-gallarey");
    }

    jumpToTop(id: string) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    }​

    handleUpdateState = (state: IFormValuesState) => {
        console.log("!!--->", state.query, state.category, state);
        const { query, category } = state.values as any;
        this.props.getAll(this.state.limit, 0, query as string, category as string[]);
    }

    render() {
        const { changePage, handleUpdateState } = this;
        const prevPath = this.getCategory(this.props.location.pathname);
        const { offset, limit, total, isFetching, portfolios } = this.props.user;
        return (
            <>
                <h1 className="heading">
                    Portfolios
                </h1>
                <Typography className="body-text" variant="body1" id="portfolios-gallarey">
                    Here you can see all photos in our database. To see more details about some
                    image, press info button. Here you also can filter and sort this images by
                    many criterias.
                </Typography>
                <PortfoliosFormControl category={prevPath} handleUpdateState={handleUpdateState} />
                <div className="portfolios">
                    {portfolios && portfolios.length > 0
                        ?
                            <Grid container={true} spacing={3}>
                                {portfolios.map((x, i) => (
                                    <Grid key={i} item={true} xl={4} lg={4} sm={12} xs={12}>
                                        <PortfolioCard  portfolio={x} />
                                    </Grid>
                                ))}
                            </Grid>
                        :
                            <p className="text-info">
                                There are no portfolios with such conditions
                            </p>
                    }
                    <LoadingSplashScreen
                        isLoading={isFetching}
                    />
                </div>
                <Pagination
                    isDisabled={isFetching}
                    cbPageChanged={changePage}
                    total={total}
                    limit={limit}
                    offset={offset}
                    textDescription={["portfolio", "portfolios"]}
                />
            </>
        );
    }
}

export default connect(Portfolios.mapStateToProps, Portfolios.mapDispatchToProps)
    (withRouter(Portfolios));
