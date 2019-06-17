import Response from "@model/response";

class Photo {
    static async getAll(
        limit: number, offset: number, query?: string, category?: string[],
        sortAsc?: boolean, widescreen?: boolean
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
            if (typeof sortAsc === "boolean") {
                params.append("sortAsc", sortAsc.toString());
            }
            if (typeof widescreen === "boolean") {
                params.append("widescreen", widescreen.toString());
            }
            console.log(params.toString());
            const response = await fetch(`/api/v1/photo/?${params}`);
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

    static async getByNumber(number: number) {
        let statusCode: number;
        let error = null;
        let respBody;
        try {
            const response = await fetch(`/api/v1/photo/${number}`);
            statusCode = response.status;
            respBody = await response.json();
            if (response.status === 404) {
                return new Response(response.status, null, respBody);
            }
            if (!response.ok || response.status !== 200) {
                throw new Error(respBody.err ? respBody.err : `${response.status} code`);
            }
        } catch (e) {
            error = e;
        }
        return new Response(statusCode!, respBody, error);
    }
}

export default Photo;
