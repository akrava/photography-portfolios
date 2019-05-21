import { ThunkAction, ThunkDispatch } from "redux-thunk";

export const TEST_REQUEST = "TEST_REQUEST";
export const TEST_SUCCESS = "TEST_SUCCESS";
export const TEST_FAILURE = "TEST_FAILURE";

export interface ITestState {
    isFetching: boolean;
    currentPage: number;
    countAllPhotos: number;
    lastError: string;
    lastErrorDate: number;
}

export const defaultPayload: ITestState = {
    isFetching: false,
    currentPage: 0,
    countAllPhotos: 0,
    lastError: "",
    lastErrorDate: 0
};

export interface ITestActions {
    type: string;
    payload: ITestState;
}

type TestResult<TResult> = ThunkAction<TResult, ITestState, undefined, ITestActions>;
export type TestThunkDispatch = ThunkDispatch<ITestState, undefined, ITestActions>;

export function fetchTest(page: number): TestResult<void> {
    return async function(dispatch: TestThunkDispatch) {
        dispatch({
            type: TEST_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        try {
            ///
        } catch (e) {
            dispatch({ type: TEST_FAILURE, payload: {
                ...defaultPayload,
                lastError: e.message,
                lastErrorDate: Date.now()
            }});
            return;
        }
        dispatch({
            type: TEST_SUCCESS,
            payload: {
                ...defaultPayload,
                photosOnPage: 0,
                currentPage: page,
                allPages: 0,
                countAllPhotos: 0
            }
        });
    };
}
