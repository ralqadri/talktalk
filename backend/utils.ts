import { Response } from "express";
import { ErrorResponse, SuccessResponse } from "../types/responses";

export function sendErrorResponse(res: Response, status: number, response: ErrorResponse): void {
    res.status(status).json(response);
}

export function sendSuccessResponse<T>(res: Response, content: SuccessResponse<T>): void {
    res.status(200).json(content);
}