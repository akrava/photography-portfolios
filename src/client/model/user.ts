import Response from "@model/response";

class User {
    static async create(
        fullname: string, username: string, password: string, isPhotographer: boolean
    ) {
        let statusCode: number;
        let error = null;
        try {
            const response = await fetch("/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullname, username, password, isPhotographer
                })
            });
            statusCode = response.status;
            const resp = await response.json();
            if (!response.ok || response.status !== 201) {
                throw new Error(resp.err ? resp.err : `${response.status} code`);
            }
        } catch (e) {
            error = e;
        }
        return new Response(statusCode!, null, error);
    }

    static async authenticate(username: string, password: string) {
        let statusCode: number;
        let respBody;
        let error = null;
        try {
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            statusCode = response.status;
            respBody = await response.json();
            if (!response.ok || response.status !== 200) {
                throw new Error(respBody.err ? respBody.err : `${response.status} code`);
            }
        } catch (e) {
            error = e;
        }
        return new Response(statusCode!, respBody, error);
    }
}

export default User;
