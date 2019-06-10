import { Dispatch } from "redux";
import { REDIRECT_GO_BACK, REDIRECT_TO_PATH, IRedirectActions } from "@actions/redirect";
import history from "@configs/configureRouterHistory";

export default () => (next: Dispatch<IRedirectActions>) => (action: IRedirectActions) => {
    if (action.type === REDIRECT_TO_PATH) {
        history.push(action.payload.path!);
    } else if (action.type === REDIRECT_GO_BACK) {
        history.goBack();
    }
    return next(action);
};
