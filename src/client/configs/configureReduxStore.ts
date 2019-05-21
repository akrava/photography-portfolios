
import { createStore, applyMiddleware, Action as ActionCommon } from "redux";
import { ITestState } from "@actions/test";
import rootReducer from "@reducers/index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";

const composeEnhancers = composeWithDevTools({});

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

export interface IAction<T = unknown> extends ActionCommon  {
    payload: T;
}

export interface IApplicationStore {
    test: ITestState;
}

export default createStore(rootReducer, enhancer);
