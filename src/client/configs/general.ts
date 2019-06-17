export namespace Configs {
    export const maxSnackOnPage = 3;
    export const siteName = "Photography portfolios";
    export function authorizationHeaders() {
        const jwt = localStorage.getItem("jwt");
        return {
            headers: { Authorization: `Bearer ${jwt}` }
        };
    }
}
