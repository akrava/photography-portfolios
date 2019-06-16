import {
    PHOTO_GET_ALL_FAILURE,
    PHOTO_GET_ALL_REQUEST,
    PHOTO_GET_ALL_SUCCESS,
    defaultPayload,
    IPhotoActions
} from "@actions/photo";

const initialState = { ...defaultPayload };

export default function userReducer(state = initialState, action: IPhotoActions) {
    const data = action.payload;
    switch (action.type) {
        case PHOTO_GET_ALL_FAILURE:
        case PHOTO_GET_ALL_REQUEST: {
            return {
                ...state,
                isFetching: data.isFetching
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
        default: {
            return state;
        }
    }
}
