import { combineReducers, Reducer } from "redux";
import testReducer from "@reducers/test";
import userReducer from "@reducers/user";
import showMessageReducer from "@reducers/showMessage";
import photoReducer from "@reducers/photo";
import { IAction } from "@configs/configureReduxStore";
import { IApplicationStore } from "@configs/configureReduxStore";

type ObjForCombineReducers = {
    [TKey in keyof IApplicationStore]: Reducer<IApplicationStore[TKey], IAction<any>>;
};

const applicationState: ObjForCombineReducers = {
    test: testReducer,
    user: userReducer,
    systemMessage: showMessageReducer,
    photos: photoReducer
};

export default combineReducers(applicationState);
