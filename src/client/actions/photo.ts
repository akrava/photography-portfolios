import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { showMessage, IShowMessageActions } from "@actions/showMessage";
import Photo from "@model/photo";

export const PHOTO_GET_ALL_REQUEST = "PHOTO_GET_ALL_REQUEST";
export const PHOTO_GET_ALL_SUCCESS = "PHOTO_GET_ALL_SUCCESS";
export const PHOTO_GET_ALL_FAILURE = "PHOTO_GET_ALL_FAILURE";
export const PHOTO_GET_ONE_REQUEST = "PHOTO_GET_ONE_REQUEST";
export const PHOTO_GET_ONE_SUCCESS = "PHOTO_GET_ONE_SUCCESS";
export const PHOTO_GET_ONE_FAILURE = "PHOTO_GET_ONE_FAILURE";

export interface IPhotoObject {
    uniqueNum: number;
    url: string;
    name: string;
    description: string;
    price: number;
    owner_id: string;
    wide_screen: boolean;
    date_added: string;
    category: "photo" | "art" | "design";
}

export interface IPhotoState {
    isFetching: boolean;
    photoArray: IPhotoObject[] | null;
    currentPhoto: IPhotoObject | null;
    errorCode?: number;
    total: number;
    limit: number;
    offset: number;
    query?: string;
    category?: string[];
    sortAsc?: boolean;
    widescreen?: boolean;
}

export const defaultPayload: IPhotoState = {
    isFetching: false,
    photoArray: null,
    currentPhoto: null,
    total: 0,
    limit: 0,
    offset: 0
};

export interface IPhotoActions {
    type: string;
    payload: IPhotoState;
}

type PhotoResult<TResult> = ThunkAction<
    TResult, IPhotoState, undefined, IPhotoActions | IShowMessageActions
>;

export type PhotoThunkDispatch = ThunkDispatch<
IPhotoState, undefined, IPhotoActions | IShowMessageActions
>;

export function getAll(
    limit: number, offset: number, query?: string, category?: string[],
    sortAsc?: boolean, widescreen?: boolean, owner?: string
): PhotoResult<void> {
    return async function(dispatch) {
        dispatch({
            type: PHOTO_GET_ALL_REQUEST,
            payload: {
                ...defaultPayload,
                isFetching: true,
                query,
                category,
                sortAsc,
                widescreen
            }
        });
        const response = await Photo.getAll(
            limit, offset, query, category, sortAsc, widescreen, owner
        );
        if (response.error !== null) {
            dispatch(showMessage(`Couldn't load photos: ${response.error!.message}`, "error"));
            dispatch({
                type: PHOTO_GET_ALL_FAILURE,
                payload: { ...defaultPayload }
            });
            return;
        }
        dispatch({
            type: PHOTO_GET_ALL_SUCCESS,
            payload: {
                ...defaultPayload,
                photoArray: response.respBody.items,
                total: response.respBody.total,
                limit: response.respBody.limit,
                offset: response.respBody.offset
            }
        });
    };
}

export function getByNumber(number: number): PhotoResult<void> {
    return async function(dispatch) {
        dispatch({
            type: PHOTO_GET_ONE_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        const response = await Photo.getByNumber(number);
        if (response.statusCode === 404) {
            dispatch({
                type: PHOTO_GET_ONE_FAILURE,
                payload: { ...defaultPayload, errorCode: 404 }
            });
            return;
        }
        if (response.error !== null) {
            dispatch(showMessage(`Couldn't load photo: ${response.error!.message}`, "error"));
            dispatch({
                type: PHOTO_GET_ONE_FAILURE,
                payload: { ...defaultPayload }
            });
            return;
        }
        dispatch({
            type: PHOTO_GET_ONE_SUCCESS,
            payload: {
                ...defaultPayload,
                currentPhoto: response.respBody
            }
        });
    };
}
