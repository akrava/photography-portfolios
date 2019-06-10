import { combineReducers, Reducer } from "redux";
import testReducer from "@reducers/test";
import userReducer from "@reducers/user";
import showMessageReducer from "@reducers/showMessage";
import { IAction } from "@configs/configureReduxStore";
import { IApplicationStore } from "@configs/configureReduxStore";

type ObjForCombineReducers = {
    [TKey in keyof IApplicationStore]: Reducer<IApplicationStore[TKey], IAction<any>>;
};

const applicationState: ObjForCombineReducers = {
    test: testReducer,
    user: userReducer,
    systemMessage: showMessageReducer
};

export default combineReducers(applicationState);
