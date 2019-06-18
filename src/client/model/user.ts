import Response from "@model/response";
import { Configs } from "@configs/general";

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

    static async getOrderedPhotos() {
        return await User.authRequest("/api/v1/user/me/ordered-photos");
    }

    static async orderedPhoto(number: number) {
        return await User.authRequest(
            `/api/v1/user/me/ordered-photos/${number}`, true, 201
        );
    }

    static async getPortfolios(
        limit: number, offset: number, query?: string, category?: string[]
    ) {
        let statusCode: number;
        let error = null;
        let respBody;
        try {
            const params = new URLSearchParams([
                ["limit", limit.toString()], ["offset", offset.toString()]
            ]);
            if (query) {
                params.append("query", query);
            }
            if (category) {
                params.append("category", category.join(","));
            }
            console.log(params.toString());
            const response = await fetch(`/api/v1/user/portfolios/?${params}`);
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

    static async authRequest(path: string, post = false, returnStat = 200) {
        let statusCode: number;
        let error = null;
        let resp;
        try {
            let headers: RequestInit = Configs.authorizationHeaders();
            if (post === true) {
                headers = { ...headers, method: "POST" };
            }
            const response = await fetch(path, headers);
            statusCode = response.status;
            resp = await response.json();
            if (!response.ok || response.status !== returnStat) {
                throw new Error(resp.err ? resp.err : `${response.status} code`);
            }
        } catch (e) {
            error = e;
        }
        return new Response(statusCode!, resp, error);
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
