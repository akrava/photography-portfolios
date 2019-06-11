import Response from "@model/response";

class Photo {
    static async getAll(
        limit: number, offset: number
    ) {
        let statusCode: number;
        let error = null;
        let respBody;
        try {

            const params = new URLSearchParams([["limit", limit.toString()], ["offset", offset.toString()]]);
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
}

export default Photo;
