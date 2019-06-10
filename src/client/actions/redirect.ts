export const REDIRECT_TO_PATH = "REDIRECT_TO_PATH";
export const REDIRECT_GO_BACK = "REDIRECT_GO_BACK";

export interface IRedirectState {
    path?: string;
}

export const defaultPayload: IRedirectState = { };

export interface IRedirectActions {
    type: string;
    payload: IRedirectState;
}

export function redirect(path: string): IRedirectActions {
    return {
        type: REDIRECT_TO_PATH,
        payload: { path }
    };
}

export function goBack(): IRedirectActions {
    return {
        type: REDIRECT_GO_BACK,
        payload: {}
    };
}
