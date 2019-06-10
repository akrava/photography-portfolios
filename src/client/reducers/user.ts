import {
    USER_REGISTER_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LOGOUT,
    USER_AUTHENTICATE_FAILURE,
    USER_AUTHENTICATE_REQUEST,
    USER_AUTHENTICATE_SUCCESS,
    defaultPayload,
    IUserActions
} from "@actions/user";

const initialState = { ...defaultPayload };

export default function userReducer(state = initialState, action: IUserActions) {
    const data = action.payload;
    switch (action.type) {
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
        default: {
            return state;
        }
    }
}
