import React from "react";
import { connect } from "react-redux";
import { IApplicationStore } from "@configs/configureReduxStore";
import { getByNumber, IPhotoState, PhotoThunkDispatch } from "@actions/photo";
import LoadingSplashScreen from "@components/special/LoadingSplashScreen";
import { withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import PhotoInformationCard from "@components/photos/PhotoInformationCard";
import Person from "@material-ui/icons/Person";
import Category from "@material-ui/icons/Category";
import Grid from "@material-ui/core/Grid";
import DateRange from "@material-ui/icons/DateRange";
import AspectRatio from "@material-ui/icons/AspectRatio";
import AttachMoney from "@material-ui/icons/AttachMoney";
import PhotoOrderBlock from "@components/photos/PhotoOrderBlock";

interface IPhotoProps {
    photos: IPhotoState;
    requestApiPhoto: (number: number) => void;
}

class Photo extends React.Component<IPhotoProps & RouteComponentProps<{ number: string }>> {
    static mapStateToProps(store: IApplicationStore) {
        return { photos: store.photos };
    }

    static mapDispatchToProps(dispatch: PhotoThunkDispatch) {
        return {
            requestApiPhoto: (number: number) => dispatch(getByNumber(number))
        };
    }

    componentDidMount() {
        const num = this.props.match.params.number;
        const number = Number.parseInt(num, 10);
        this.props.requestApiPhoto(number);
    }

    readableDate(date: string) {
        const options = { month: "long", day: "numeric", year: "numeric" };
        return new Date(date).toLocaleDateString("en", options).toString();
    }

    render() {
        const { isFetching, currentPhoto, errorCode } = this.props.photos;
        const { readableDate } = this;
        return (
            <div className="photo">
                {errorCode === 404 && <Redirect to="/404" />}
                {!isFetching && currentPhoto &&
                    <>
                        <h1 className="heading">
                            Photo: <b>{currentPhoto.name}</b>
                        </h1>
                        <figure className="photo__figure">
                            <img
                                className="photo__main-img"
                                src={currentPhoto.url}
                                alt={currentPhoto.name}
                            />
                            <figcaption className="photo__caption">
                                {currentPhoto.description}
                            </figcaption>
                        </figure>
                        <div className="photo__description">
                            <h2 className="photo__description-heading">
                                Features:
                            </h2>
                            <Grid container={true} spacing={3}>
                                <Grid item={true} lg={4} sm={6} xs={12}>
                                    <PhotoInformationCard name="Author" value="Andrew">
                                        <Person />
                                    </PhotoInformationCard>
                                </Grid>
                                <Grid item={true} lg={4} sm={6} xs={12}>
                                    <PhotoInformationCard
                                        name="Category"
                                        value={currentPhoto.category}
                                    >
                                        <Category />
                                    </PhotoInformationCard>
                                </Grid>
                                <Grid item={true} lg={4} sm={6} xs={12}>
                                    <PhotoInformationCard
                                        name="Date"
                                        value={readableDate(currentPhoto.date_added)}
                                    >
                                        <DateRange />
                                    </PhotoInformationCard>
                                </Grid>
                                <Grid item={true} lg={6} sm={6} xs={12}>
                                    <PhotoInformationCard
                                        name="Aspect ratio"
                                        value={currentPhoto.wide_screen ? "16:9" : "4:3"}
                                    >
                                        <AspectRatio />
                                    </PhotoInformationCard>
                                </Grid>
                                <Grid item={true} lg={6} sm={12} xs={12}>
                                    <PhotoInformationCard
                                        name="Price"
                                        value={`${currentPhoto.price} UAH`}
                                    >
                                        <AttachMoney />
                                    </PhotoInformationCard>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <h2 className="photo__description-heading">
                                Actions:
                            </h2>
                            <PhotoOrderBlock
                                numberPhoto={currentPhoto.uniqueNum}
                                price={currentPhoto.price}
                            />
                        </div>
                    </>
                }
                <LoadingSplashScreen
                    isLoading={isFetching || !currentPhoto}
                />
            </div>
        );
    }
}

export default connect(Photo.mapStateToProps, Photo.mapDispatchToProps)(withRouter(Photo));
