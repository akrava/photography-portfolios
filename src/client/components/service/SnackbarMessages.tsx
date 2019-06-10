import React from "react";
import { connect } from "react-redux";
import { withSnackbar, WithSnackbarProps } from "notistack";
import { IApplicationStore } from "@configs/configureReduxStore";
import { IShowMessageState } from "@actions/showMessage";

interface ISnackbarMessagesProps {
    messages: IShowMessageState;
}

class SnackbarMessages extends React.Component<ISnackbarMessagesProps & WithSnackbarProps> {
    static mapStateToProps(store: IApplicationStore) {
        return { messages: store.systemMessage };
    }

    static getDerivedStateFromProps(
        nextProps: ISnackbarMessagesProps & WithSnackbarProps,
        prevState: IShowMessageState
    ) {
        const currentMessage = nextProps.messages;
        if (currentMessage.id > 0 && currentMessage.id !== prevState.id) {
            nextProps.enqueueSnackbar(currentMessage.message, {
                variant: currentMessage.type,
                autoHideDuration: 3000,
            });
            return {
                id:      currentMessage.id,
                message: currentMessage.message,
                type:    currentMessage.type
            };
        }
        return prevState;
    }

    state: IShowMessageState = {
        id: 0,
        message: "",
        type: "default"
    };

    render() {
        return null;
    }
}

export default connect(SnackbarMessages.mapStateToProps)(withSnackbar(SnackbarMessages));
