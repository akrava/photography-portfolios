import { createStore, applyMiddleware, Action as ActionCommon } from "redux";
import { IUserState } from "@actions/user";
import { IShowMessageState } from "@actions/showMessage";
import { IPhotoState } from "@actions/photo";
import rootReducer from "@reducers/index";
import thunk from "redux-thunk";
import redirect from "@middlewares/redirect";
import showMessage from "@middlewares/showMessage";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";

const composeEnhancers = composeWithDevTools({});

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(redirect),
    applyMiddleware(showMessage)
);

export interface IAction<T = unknown> extends ActionCommon  {
    payload: T;
}

export interface IApplicationStore {
    user: IUserState;
    systemMessage: IShowMessageState;
    photos: IPhotoState;
}

export default createStore(rootReducer, enhancer);
