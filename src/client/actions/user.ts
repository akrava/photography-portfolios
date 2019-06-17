import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { showMessage, IShowMessageActions } from "@actions/showMessage";
import { redirect, IRedirectActions } from "@actions/redirect";
import { IPhotoObject } from "@actions/photo";
import User from "@model/user";

export const USER_AUTHENTICATE_REQUEST      = "USER_AUTHENTICATE_REQUEST";
export const USER_AUTHENTICATE_SUCCESS      = "USER_AUTHENTICATE_SUCCESS";
export const USER_AUTHENTICATE_FAILURE      = "USER_AUTHENTICATE_FAILURE";
export const USER_LOGOUT                    = "USER_LOGOUT";
export const USER_REGISTER_REQUEST          = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS          = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE          = "USER_REGISTER_FAILURE";
export const USER_PHOTOS_LIST_FETCH_REQUEST = "USER_PHOTOS_LIST_FETCH_REQUEST";
export const USER_PHOTOS_LIST_FETCH_SUCCESS = "USER_PHOTOS_LIST_FETCH_SUCCESS";
export const USER_PHOTOS_LIST_FETCH_FAILURE = "USER_PHOTOS_LIST_FETCH_FAILURE";
export const USER_PHOTOS_ORDER_REQUEST      = "USER_PHOTOS_ORDER_REQUEST";
export const USER_PHOTOS_ORDER_SUCCESS      = "USER_PHOTOS_ORDER_SUCCESS";
export const USER_PHOTOS_ORDER_FAILURE      = "USER_PHOTOS_ORDER_FAILURE";

export interface IUserObject {
    id: string;
    login: string;
    password: string;
    role: number;
    fullname: string;
    registered?: Date;
    avaUrl?: string;
    orderedPhotos?: IPhotoObject[];
}

export interface IUserState {
    isFetching: boolean;
    isLogined: boolean;
    userObject: IUserObject | null;
}

export const defaultPayload: IUserState = {
    isFetching: false,
    isLogined: false,
    userObject: null
};

export interface IUserActions {
    type: string;
    payload: IUserState;
}

type UserResult<TResult> = ThunkAction<
    TResult, IUserState, undefined, IUserActions | IShowMessageActions | IRedirectActions
>;
export type UserThunkDispatch = ThunkDispatch<
    IUserState, undefined, IUserActions | IShowMessageActions | IRedirectActions
>;

export function authenticate(login: string, password: string): UserResult<void> {
    return async function(dispatch) {
        dispatch({
            type: USER_AUTHENTICATE_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        const response = await User.authenticate(login, password);
        if (response.error !== null) {
            dispatch(showMessage(`${response.error!.message}`, "error"));
            dispatch({
                type: USER_AUTHENTICATE_FAILURE,
                payload: { ...defaultPayload }
            });
            return;
        }
        const jwt = response.respBody.token;
        localStorage.setItem("jwt", jwt);
        const userObject = response.respBody.user;
        dispatch({
            type: USER_AUTHENTICATE_SUCCESS,
            payload: { ...defaultPayload, userObject, isLogined: true },
        });
        dispatch(redirect("/"));
    };
}

export function logout(): UserResult<void> {
    return function(dispatch) {
        localStorage.removeItem("jwt");
        dispatch({
            type: USER_LOGOUT,
            payload: { ...defaultPayload },
        });
        dispatch(redirect("/"));
    };
}

export function register(
    fullname: string, username: string, password: string, isPhotographer: boolean
): UserResult<void> {
    return async function(dispatch) {
        dispatch({
            type: USER_REGISTER_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        const response = await User.create(fullname, username, password, isPhotographer);
        if (response.error !== null) {
            dispatch(showMessage(`Couldn't register: ${response.error!.message}`, "error"));
            dispatch({
                type: USER_REGISTER_FAILURE,
                payload: { ...defaultPayload }
            });
            return;
        }
        dispatch(showMessage("Successfully registered!", "success"));
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: { ...defaultPayload },
        });
        dispatch(redirect("/login"));
    };
}

export function getOrderedPhotos(): UserResult<void> {
    return async function(dispatch) {
        dispatch({
            type: USER_PHOTOS_LIST_FETCH_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        const response = await User.getOrderedPhotos();
        if (response.error !== null) {
            dispatch(showMessage(`Couldn't find photos: ${response.error!.message}`, "error"));
            dispatch({
                type: USER_PHOTOS_LIST_FETCH_FAILURE,
                payload: { ...defaultPayload }
            });
            return;
        }
        const userObjectWithPhotos: IUserObject =  {
            ...defaultPayload.userObject!, orderedPhotos: response.respBody
        };
        dispatch({
            type: USER_PHOTOS_LIST_FETCH_SUCCESS,
            payload: {
                ...defaultPayload,
                userObject: userObjectWithPhotos
            },
        });
    };
}

export function orderedPhoto(number: number): UserResult<void> {
    return async function(dispatch) {
        dispatch({
            type: USER_PHOTOS_ORDER_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        const response = await User.orderedPhoto(number);
        if (response.error !== null) {
            dispatch(showMessage(`Couldn't order photos: ${response.error!.message}`, "error"));
            dispatch({
                type: USER_PHOTOS_ORDER_FAILURE,
                payload: { ...defaultPayload }
            });
            return;
        }
        const userObjectWithPhotos: IUserObject =  {
            ...defaultPayload.userObject!, orderedPhotos: response.respBody
        };
        dispatch(showMessage("Successfully ordered!", "success"));
        dispatch({
            type: USER_PHOTOS_ORDER_SUCCESS,
            payload: {
                ...defaultPayload,
                userObject: userObjectWithPhotos
            },
        });
    };
}
