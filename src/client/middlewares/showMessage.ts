import { Dispatch } from "redux";
import { SHOW_MESSAGE, IShowMessageActions } from "@actions/showMessage";

export default () => (next: Dispatch<IShowMessageActions>) => (action: IShowMessageActions) => {
    if (action.type === SHOW_MESSAGE) {
        action.payload.id = new Date().getTime() + Math.random();
    }
    return next(action);
};
