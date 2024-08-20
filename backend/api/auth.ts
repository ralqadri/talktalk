import express from "express";
import { sendErrorResponse, sendSuccessResponse } from "../utils";
import { compare } from "bcrypt";
import config from "../../config.json";

const router = express.Router();

router.post("/api/auth", async (req, res) => {
    const { username, password } = req.body;
    if (username !== config.admin.username) {
        sendErrorResponse(res, 401, {
            message: "Failed to authenticate",
            error: "Invalid username",
        });
        return;
    }

    compare(password, config.admin.password, (err, result) => {
        if (err || !result) {
            sendErrorResponse(res, 401, {
                message: "Failed to authenticate",
                error: "Invalid password",
            });
            return;
        }

        req.session.isAdmin = true;
        sendSuccessResponse(res, {
            message: "Successfully authenticated",
            content: { isAdmin: req.session.isAdmin },
        });
    });
});

export default router;