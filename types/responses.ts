interface Response {
    message: string;
}

export interface ErrorResponse extends Response {
    error: string;
}

export function isErrorResponse(obj: any): obj is ErrorResponse {
    return (
        obj &&
        typeof obj === "object" &&
        typeof obj.message === "string" &&
        typeof obj.error === "string"
    );
}

export interface SuccessResponse<T> extends Response {
    content: T;
}

export function isSuccessResponse<T>(obj: any, validator: (obj: any) => obj is T): obj is SuccessResponse<T> {
    return (
        obj &&
        typeof obj === "object" &&
        typeof obj.message === "string" &&
        validator(obj.content)
    )
}