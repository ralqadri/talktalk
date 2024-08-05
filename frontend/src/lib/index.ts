// place files you want to import through the `$lib` alias in this folder.
import { isErrorResponse, isSuccessResponse, type ErrorResponse, type SuccessResponse } from "../../../types/responses";

type ApiResponse<T> = { status: number } & (
    ({ ok: true } & SuccessResponse<T>) |
    ({ ok: false } & ErrorResponse)
); 

export async function apiFetch<T>(
    fetchFunc: typeof fetch = fetch,
    typeValidator: (obj: any) => obj is T,
    reqInfo: RequestInfo,
    reqInit?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const res = await fetchFunc(reqInfo, reqInit);
        const json = await res.json();
        // Ensure that the json is of type SuccessResponse<T>
        if (res.ok && isSuccessResponse<T>(json, typeValidator))
            return {
                status: res.status,
                ok: res.ok,
                message: json.message,
                content: json.content,
            };
        else if (isErrorResponse(json))
            return {
                status: res.status,
                ok: false,
                message: json.message,
                error: json.error,
            };

        // Could not parse JSON type properly
        console.error(json);
        return {
            status: 500,
            ok: false,
            message: "Unknown error, resulting JSON is not of type SuccessResponse<T> or ErrorResponse",
            error: "Unknown error, resulting JSON is not of type SuccessResponse<T> or ErrorResponse",
        };
    } catch (err) {
        console.error(err);
        return {
            status: 500,
            ok: false,
            message: "Unknown error, fetch failed. Check console for more information.",
            error: "Unknown error, fetch failed. Check console for more information.",
        };
    }
}