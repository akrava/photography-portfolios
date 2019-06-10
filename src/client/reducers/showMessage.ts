import {
    SHOW_MESSAGE,
    IShowMessageActions,
    defaultPayload
} from "@actions/showMessage";

const initialState = { ...defaultPayload };

export default function showMessageReducer(state = initialState, action: IShowMessageActions) {
    const data = action.payload;
    switch (action.type) {
        case SHOW_MESSAGE: {
            return {
                message: data.message,
                type:    data.type,
                id:      data.id
            };
        }
        default: {
            return state;
        }
    }
}
