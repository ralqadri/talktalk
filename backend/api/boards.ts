import express from "express";
import { board } from "../../types/boards";
import { sendErrorResponse, sendSuccessResponse } from "../utils";
import db from "../db";

const router = express.Router();

// api: get all boards
router.get("/api/boards", (req, res) => {
    const query = `SELECT * FROM boards`;

    db.all(query, [], function (err: Error | null, rows: board[]) {
        if (err) {
            sendErrorResponse(res, 500, {
                message: "GET /api/boards failed!",
                error: err.message,
            });
            return;
        }

        sendSuccessResponse(res, {
            message: "Board list fetched succesfully!",
            content: rows,
        });
    });
});

// api: get random board
router.get("/api/boards/random", (req, res) => {
    const query = `SELECT * FROM boards ORDER BY RANDOM() LIMIT 1`;

    db.get(query, [], function (err: Error | null, row: board) {
        if (err) {
            sendErrorResponse(res, 500, {
                message: "GET /api/boards/random failed!",
                error: err.message,
            });
        }

        sendSuccessResponse(res, {
            message: "Random board fetched succesfully!",
            content: row,
        });
    });
});

// api: get specific board
router.get("/api/boards/:id", (req, res) => {
    const query = `SELECT * FROM boards WHERE boards.id = ?`;
    const params = [req.params.id];

    db.get(query, params, function (err: Error | null, row: board) {
        if (err) {
            sendErrorResponse(res, 500, {
                message: `GET /api/boards/${params[0]} failed!`,
                error: err.message,
            });
            return;
        }

        if (!row) {
            sendErrorResponse(res, 404, {
                message: `Board ${params[0]} not found!`,
                error: `Board ${params[0]} not found!`,
            });
            return;
        }

        sendSuccessResponse(res, {
            message: `Board ${params[0]} fetched succesfully!`,
            content: row,
        });
    });
});

// api: create new board
router.post("/api/boards", (req, res) => {
    const { name, description } = req.body;
    const query = `INSERT INTO boards (name, description) VALUES (?, ?)`;
    const params = [name, description];

    console.log(
        `api: creating new board // name: ${name} // description: ${description}`
    );

    db.run(query, params, function (err: Error | null) {
        if (err) {
            sendErrorResponse(res, 500, {
                message: "POST /api/boards failed!",
                error: err.message,
            });
            return;
        }

        console.log(
            `api: creating new board // board created! // name: ${name} // description: ${description}`
        );

        const newBoard: board = {
            id: this.lastID,
            name,
            description,
            created_at: new Date().toISOString(),
        };
        sendSuccessResponse(res, {
            message: "Board created succesfully!",
            content: newBoard,
        });
    });
});

export default router;