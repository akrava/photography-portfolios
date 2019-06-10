class Response {
    statusCode: number;
    respBody: any;
    error?: Error;

    constructor(statusCode: number, respBody: unknown, error?: Error) {
        this.statusCode = statusCode;
        this.respBody = respBody;
        this.error = error;
    }
}

export default Response;
