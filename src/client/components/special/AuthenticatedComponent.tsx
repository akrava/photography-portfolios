import React from "react";
import { connect } from "react-redux";
import Forbidden from "@routes/Forbidden";
import NotAuthorized from "@routes/NotAuthorized";
import { IApplicationStore } from "@configs/configureReduxStore";
import { IUserState } from "@actions/user";

export default function requireAuthentication(
    Component: React.Component,
    customCheckAccess?: boolean
) {
    interface IAuthenticatedComponentProps {
        user: IUserState;
    }

    class AuthenticatedComponent extends React.Component<IAuthenticatedComponentProps> {
        static mapStateToProps(store: IApplicationStore) {
            return { user: store.user };
        }

        showComponent() {
            const { isLogined } = this.props.user;
            if (!isLogined) {
                return <NotAuthorized />;
            } else {
                if (typeof customCheckAccess === "boolean") {
                    return customCheckAccess ? Component : <Forbidden /> ;
                } else {
                    return Component;
                }
            }
        }

        render() {
            return this.showComponent();
        }
    }

    return connect(AuthenticatedComponent.mapStateToProps)(AuthenticatedComponent);
}
