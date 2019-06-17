import React from "react";
import { connect } from "react-redux";
import { IApplicationStore } from "@configs/configureReduxStore";
import { getOrderedPhotos, orderedPhoto, IUserState, UserThunkDispatch } from "@actions/user";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";
import PhotoOrderDialog from "@components/photos/PhotoOrderDialog";

interface IPhotoOrderBlockProps {
    numberPhoto: number;
    price: number;
    user: IUserState;
    getOrderedPhotos: () => void;
    orderPhoto: (num: number) => void;
}

class PhotoOrderBlock extends React.Component<IPhotoOrderBlockProps> {
    static mapStateToProps(store: IApplicationStore) {
        return { user: store.user };
    }

    static mapDispatchToProps(dispatch: UserThunkDispatch) {
        return {
            getOrderedPhotos: () => dispatch(getOrderedPhotos()),
            orderPhoto: (num: number) => dispatch(orderedPhoto(num))
        };
    }

    state = {
        openedOrderdDialog: false
    };

    renderLoginedGroup = () => {
        const { userObject } = this.props.user;
        const { numberPhoto } = this.props;
        if (!userObject) {
            return null;
        }
        const { orderedPhotos } = userObject;
        if (orderedPhotos && orderedPhotos.some((x) => x.uniqueNum === numberPhoto)) {
            return (
                <p>
                    You have already bought this photo. <br />
                    Visit your <Link to="/user/me">profile</Link>
                </p>
            );
        } else {
            return (
                <Button
                    onClick={() => this.dialogChangeState(true)}
                    color="secondary"
                    variant="outlined"
                >
                    Buy
                </Button>
            );
        }

    }

    renderGuestGroup() {
        return (
            <Link to="/login">
                <Button variant="outlined">Log in</Button>
            </Link>
        );
    }

    componentDidMount() {
        if (this.props.user.isLogined) {
            this.props.getOrderedPhotos();
        }
    }

    dialogChangeState = (opened = false) => {
        this.setState({ openedOrderdDialog: opened });
    }

    orderPhoto = () => {
        this.props.orderPhoto(this.props.numberPhoto);
    }

    render() {
        const { renderLoginedGroup, renderGuestGroup, dialogChangeState, orderPhoto } = this;
        const { price, user } = this.props;
        const { openedOrderdDialog } = this.state;
        return (
            <>
                <Card className="order-card">
                    <AddPhotoAlternate fontSize="large" />
                    <div className="order-card__proposal">
                        <p>Price: <b>{price}</b> UAH</p>
                        <p>Do you want to order now?</p>
                    </div>
                    <div className="order-card__actions">
                        {user.isLogined
                            ? renderLoginedGroup()
                            : renderGuestGroup()
                        }
                    </div>
                </Card>
                <PhotoOrderDialog
                    price={price}
                    opened={openedOrderdDialog}
                    handleClose={() => dialogChangeState(false)}
                    confirmOrder={orderPhoto}
                />
            </>
        );
    }
}

export default connect(PhotoOrderBlock.mapStateToProps, PhotoOrderBlock.mapDispatchToProps)
    (PhotoOrderBlock);
