import {
    TEST_FAILURE,
    TEST_REQUEST,
    TEST_SUCCESS,
    ITestActions,
    defaultPayload
} from "@actions/test";

const initialState = { ...defaultPayload };

export default function testReducer(state = initialState, action: ITestActions) {
    const data = action.payload;
    switch (action.type) {
        case TEST_FAILURE:
        case TEST_REQUEST:
        case TEST_SUCCESS: {
            return {
                ...state,
                isFetching:    data.isFetching,
                lastError:     data.lastError,
                lastErrorDate: data.lastErrorDate
            };
        }
        default: {
            return state;
        }
    }
}
