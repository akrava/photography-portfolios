import {
    PHOTO_GET_ALL_FAILURE,
    PHOTO_GET_ALL_REQUEST,
    PHOTO_GET_ALL_SUCCESS,
    PHOTO_GET_ONE_FAILURE,
    PHOTO_GET_ONE_REQUEST,
    PHOTO_GET_ONE_SUCCESS,
    defaultPayload,
    IPhotoActions
} from "@actions/photo";

const initialState = { ...defaultPayload };

export default function userReducer(state = initialState, action: IPhotoActions) {
    const data = action.payload;
    switch (action.type) {
        case PHOTO_GET_ONE_REQUEST:
        case PHOTO_GET_ONE_FAILURE:
        case PHOTO_GET_ALL_FAILURE: {
            return {
                ...state,
                isFetching: data.isFetching,
                errorCode: data.errorCode
            };
        }
        case PHOTO_GET_ALL_REQUEST: {
            return {
                ...state,
                isFetching: data.isFetching,
                errorCode: data.errorCode,
                query: data.query,
                category: data.category,
                sortAsc: data.sortAsc,
                widescreen: data.widescreen
            };
        }
        case PHOTO_GET_ALL_SUCCESS: {
            return {
                ...state,
                isFetching: data.isFetching,
                photoArray: data.photoArray,
                total: data.total,
                limit: data.limit,
                offset: data.offset
            };
        }
        case PHOTO_GET_ONE_SUCCESS: {
            return {
                ...state,
                isFetching: data.isFetching,
                currentPhoto: data.currentPhoto
            };
        }
        default: {
            return state;
        }
    }
}
