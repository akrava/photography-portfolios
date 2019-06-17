import React from "react";
import { connect } from "react-redux";
import withWidth, { WithWidthProps, isWidthUp } from "@material-ui/core/withWidth";
import { IApplicationStore } from "@configs/configureReduxStore";
import { getAll, IPhotoState, PhotoThunkDispatch } from "@actions/photo";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Pagination from "@components/controls/Pagination";
import PhotosFormControl from "@components/photos/PhotosFormControl";
import LoadingSplashScreen from "@components/special/LoadingSplashScreen";
import Typography from "@material-ui/core/Typography";

interface IPhotosProps {
    photos: IPhotoState;
    requestApiPhotos: (
        limit: number, offset: number, query?: string, category?: string[],
        sortAsc?: boolean, widescreen?: boolean
    ) => void;
}

interface IPhotosState  {
    limit: number;
    offset: number;
    query?: string;
    sortAsc?: boolean;
    category?: string[];
    widescreen?: boolean;
    loadedImages: boolean[] | null;
}

class Photos extends React.Component<IPhotosProps & WithWidthProps, IPhotosState> {
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
        offset: 0,
        loadedImages: null
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
        const newState = { ...this.state, offset, loadedImages: null };
        this.upadatePhotos(newState);
        this.setState(newState);
    }

    upadatePhotos = (state: IPhotosState) => {
        const { limit, offset, query, sortAsc, category, widescreen } = state;
        this.props.requestApiPhotos(limit, offset, query, category, sortAsc, widescreen);
        this.jumpToTop("photos-gallarey");
    }

    jumpToTop(id: string) {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo(0, el.offsetTop);
        }
    }​

    handleLoadImage = (i: number) => {
        let { loadedImages } = this.state;
        const { photoArray } = this.props.photos;
        if (!photoArray) {
            return;
        }
        if (!loadedImages) {
           loadedImages = new Array(photoArray.length).fill(false);
        }
        loadedImages[i] = true;
        this.setState({
            loadedImages
        });
    }

    render() {
        const { gridPhotosCols, changePage, handleLoadImage } = this;
        const { offset, limit, total, isFetching, photoArray } = this.props.photos;
        const { requestApiPhotos } = this.props;
        const { loadedImages } = this.state;
        return (
            <>
                <h1 className="heading" id="photos-gallarey">
                    Photos
                </h1>
                <Typography variant="body1">
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
                        <GridList className="photos__grid" cols={gridPhotosCols()} cellHeight={220}>
                            {photoArray.map((tile, i) => (
                                <GridListTile key={i} className="photo-card">
                                    <img
                                        src={tile.url}
                                        alt={tile.name}
                                        onLoad={() => handleLoadImage(i)}
                                    />
                                    <GridListTileBar
                                        className="photo-card__title"
                                        title={tile.name}
                                        subtitle={<span>by: {tile.description}</span>}
                                        actionIcon={
                                            <div className="photo-card__icon">
                                                <IconButton
                                                    aria-label={`info about ${tile.name}`}
                                                    color="inherit"
                                                >
                                                    <InfoIcon />
                                                </IconButton>
                                            </div>
                                        }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                        :
                        <p className="text-info">
                            There are no images with such conditions
                        </p>
                    }
                    <LoadingSplashScreen
                        isLoading={
                            isFetching || loadedImages === null ||
                            (loadedImages !== null && loadedImages.some((x) => x === false))
                        }
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
    (withWidth({ withTheme: true })(Photos));
