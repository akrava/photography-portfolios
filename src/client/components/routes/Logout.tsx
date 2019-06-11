import React from "react";
import { connect } from "react-redux";
import { IApplicationStore } from "@configs/configureReduxStore";
import { logout, IUserState, UserThunkDispatch } from "@actions/user";

interface ILogoutProps {
    user: IUserState;
    logout: () => void;
}

class Logout extends React.Component<ILogoutProps> {
    static mapStateToProps(store: IApplicationStore) {
        return { user: store.user };
    }

    static mapDispatchToProps(dispatch: UserThunkDispatch) {
        return { logout: () => dispatch(logout()) };
    }

    componentDidMount() {
        this.props.logout();
    }

    render() {
        return null;
    }
}

export default connect(Logout.mapStateToProps, Logout.mapDispatchToProps)(Logout);
