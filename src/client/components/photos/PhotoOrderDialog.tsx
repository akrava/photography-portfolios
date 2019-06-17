import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface IPhotosOrderDialogProps {
    opened: boolean;
    price: number;
    confirmOrder: () => void;
    handleClose: () => void;
}

class PhotosOrderDialog extends React.Component<IPhotosOrderDialogProps> {
    confirm = () => {
        this.props.confirmOrder();
        this.props.handleClose();
    }

    render() {
        const { opened, handleClose, price } = this.props;
        const { confirm } = this;
        return (
            <div>
                <Dialog
                    open={opened}
                    onClose={handleClose}
                >
                    <DialogTitle>
                        Do you want to buy this masterpiece?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Pressing the button "Buy", you confirm, that you want
                            to buy this photo for {price} UAH. After confirming,
                            you couldn't revert this action.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="inherit">
                            Cancel
                        </Button>
                        <Button onClick={confirm} color="primary" autoFocus={true}>
                            Buy
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default PhotosOrderDialog;
