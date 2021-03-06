import {
    USER_REGISTER_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LOGOUT,
    USER_AUTHENTICATE_FAILURE,
    USER_AUTHENTICATE_REQUEST,
    USER_AUTHENTICATE_SUCCESS,
    USER_PHOTOS_LIST_FETCH_FAILURE,
    USER_PHOTOS_LIST_FETCH_REQUEST,
    USER_PHOTOS_LIST_FETCH_SUCCESS,
    USER_PHOTOS_ORDER_FAILURE,
    USER_PHOTOS_ORDER_REQUEST,
    USER_PHOTOS_ORDER_SUCCESS,
    GET_PORTFOLIOS_FAILURE,
    GET_PORTFOLIOS_REQUEST,
    GET_PORTFOLIOS_SUCCESS,
    defaultPayload,
    IUserActions
} from "@actions/user";

const initialState = { ...defaultPayload };

export default function userReducer(state = initialState, action: IUserActions) {
    const data = action.payload;
    switch (action.type) {
        case GET_PORTFOLIOS_FAILURE:
        case USER_PHOTOS_LIST_FETCH_REQUEST:
        case USER_PHOTOS_LIST_FETCH_FAILURE:
        case USER_PHOTOS_ORDER_REQUEST:
        case USER_PHOTOS_ORDER_FAILURE:
        case USER_REGISTER_FAILURE:
        case USER_REGISTER_REQUEST:
        case USER_REGISTER_SUCCESS: {
            return {
                ...state,
                isFetching: data.isFetching
            };
        }
        case USER_AUTHENTICATE_FAILURE:
        case USER_AUTHENTICATE_REQUEST: {
            return {
                ...state,
                isFetching: data.isFetching
            };
        }
        case USER_AUTHENTICATE_SUCCESS: {
            return {
                ...state,
                isLogined:  data.isLogined,
                userObject: data.userObject,
                isFetching: data.isFetching
            };
        }
        case USER_LOGOUT: {
            return {
                ...state,
                isLogined:  data.isLogined,
                userObject: data.userObject
            };
        }
        case USER_PHOTOS_ORDER_SUCCESS:
        case USER_PHOTOS_LIST_FETCH_SUCCESS: {
            const userObject = {
                ...state.userObject!,
                orderedPhotos: data.userObject!.orderedPhotos
            };
            return {
                ...state,
                isFetching: data.isFetching,
                userObject
            };
        }
        case GET_PORTFOLIOS_REQUEST: {
            return {
                ...state,
                isFetching: data.isFetching,
                query: data.query,
                category: data.category,
            };
        }
        case GET_PORTFOLIOS_SUCCESS: {
            return {
                ...state,
                isFetching: data.isFetching,
                portfolios: data.portfolios,
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
