import { NextFunction, Request, Response } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.session.isAdmin)
        next();
    else {
        res.status(401).json({
            message: "Unauthorized",
            error: "You are not an admin",
        });
        return;
    }
}