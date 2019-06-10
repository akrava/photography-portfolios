export const SHOW_MESSAGE = "SHOW_MESSAGE";

type variantMessage = "default" | "error" | "warning" | "info" | "success";

export interface IShowMessageState {
    id: number;
    message: string;
    type: variantMessage;
}

export const defaultPayload: IShowMessageState = {
    id: -1,
    message: "",
    type: "default"
};

export interface IShowMessageActions {
    type: string;
    payload: IShowMessageState;
}

export function showMessage(message: string, variant: variantMessage): IShowMessageActions {
    return {
        type: SHOW_MESSAGE,
        payload: { ...defaultPayload, message, type: variant }
    };
}
