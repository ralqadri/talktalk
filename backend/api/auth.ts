import express from "express";
import { sendErrorResponse, sendSuccessResponse } from "../utils";
import { compare } from "bcrypt";
import config from "../../config.json";

const router = express.Router();

router.get("/api/auth", (req, res) => sendSuccessResponse(res, {
    message: "Authentication status fetched",
    content: { isAdmin: req.session.isAdmin },
}));

router.post("/api/auth", async (req, res) => {
    if (req.session.isAdmin) {
        sendSuccessResponse(res, {
            message: "Already authenticated",
            content: { isAdmin: req.session.isAdmin },
        });
        return;
    }

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