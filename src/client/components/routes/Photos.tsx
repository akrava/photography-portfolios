import React from "react";
import { connect } from "react-redux";
import withWidth, { WithWidthProps, isWidthUp } from "@material-ui/core/withWidth";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IApplicationStore } from "@configs/configureReduxStore";
import { getAll, IPhotoState, PhotoThunkDispatch } from "@actions/photo";
import Pagination from "@components/controls/Pagination";
import PhotosFormControl from "@components/photos/PhotosFormControl";
import LoadingSplashScreen from "@components/special/LoadingSplashScreen";
import Typography from "@material-ui/core/Typography";
import PhotoCards from "@components/photos/PhotoCards";

type requestPhotosType = (
    limit: number, offset: number, query?: string, category?: string[],
    sortAsc?: boolean, widescreen?: boolean
) => void;

interface IPhotosProps {
    photos: IPhotoState;
    requestApiPhotos: requestPhotosType;
}

interface IPhotosState  {
    limit: number;
    offset: number;
    query?: string;
    sortAsc?: boolean;
    category?: string[];
    widescreen?: boolean;
}

class Photos extends React.Component<
    IPhotosProps & WithWidthProps & RouteComponentProps, IPhotosState
> {
    static mapStateToProps(store: IApplicationStore) {
        return { photos: store.photos };
    }

    static mapDispatchToProps(dispatch: PhotoThunkDispatch) {
        return {
            requestApiPhotos: (
                limit: number, offset: number, query?: string, category?: string[],
                sortAsc?: boolean, widescreen?: boolean
            ) => dispatch(getAll(limit, offset, query, category, sortAsc, widescreen))
        };
    }

    state: IPhotosState = {
        limit: 12,
        offset: 0
    };

    componentDidMount() {
        this.props.requestApiPhotos(this.state.limit, 0);
    }

    gridPhotosCols = () => {
        const width = this.props.width!;
        if (isWidthUp("xl", width)) {
           return 4;
        } else if (isWidthUp("lg", width)) {
            return 3;
        } else if (isWidthUp("sm", width)) {
            return 2;
        }
        return 1;
    }

    changePage = (offset: number) => {
        const newState = { ...this.state, offset };
        this.upadatePhotos(newState);
        this.setState(newState);
    }

    upadatePhotos = (state: IPhotosState) => {
        const { limit, offset } = state;
        const { query, category, sortAsc, widescreen } = this.props.photos;
        this.props.requestApiPhotos(limit, offset, query, category, sortAsc, widescreen);
        this.jumpToTop("photos-gallarey");
    }

    jumpToTop(id: string) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    }​

    render() {
        const { gridPhotosCols, changePage } = this;
        const { offset, limit, total, isFetching, photoArray } = this.props.photos;
        const { requestApiPhotos } = this.props;
        const { push } = this.props.history;
        return (
            <>
                <h1 className="heading">
                    Photos
                </h1>
                <Typography className="body-text" variant="body1" id="photos-gallarey">
                    Here you can see all photos in our database. To see more details about some
                    image, press info button. Here you also can filter and sort this images by
                    many criterias.
                </Typography>
                <PhotosFormControl
                    limit={limit}
                    apiRequestToPhotos={requestApiPhotos}
                    className="photos__controls"
                />
                <div className="photos">
                    {photoArray && photoArray.length > 0
                        ?
                            <PhotoCards
                                cellHeight={220}
                                cols={gridPhotosCols()}
                                images={photoArray}
                                goToPage={push}
                            />
                        :
                            <p className="text-info">
                                There are no images with such conditions
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
                    textDescription={["photo", "photos"]}
                />
            </>
        );
    }
}

export default connect(Photos.mapStateToProps, Photos.mapDispatchToProps)
    (withWidth({ withTheme: true })(withRouter(Photos)));
