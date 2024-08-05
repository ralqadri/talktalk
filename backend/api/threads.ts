import express from "express";
import db from "../db";
import { thread } from "../../types/threads";
import { sendErrorResponse, sendSuccessResponse } from "../utils";

const router = express.Router();

// api: get all threads
router.get("/api/threads", (req, res) => {
	const query = `SELECT * FROM threads`;

	db.all(query, [], function (err: Error | null, rows: thread[]) {
		if (err) {
			sendErrorResponse(res, 500, { message: "GET /api/threads failed!", error: err.message });
            return;
		}

		sendSuccessResponse(res, { message: "Thread list fetched succesfully!", content: rows });
	});
});

// api: get specific thread
router.get("/api/threads/:id", (req, res) => {
	const query = `SELECT * FROM threads WHERE id = ?`;
	const params = [req.params.id];

	db.get(query, params, function (err: Error | null, row: thread) {
		if (err) {
			sendErrorResponse(res, 500, { message: `GET /api/threads/${params[0]} failed!`, error: err.message });
            return;
		}

		if (!row) {
			sendErrorResponse(res, 404, { message: `Thread ${params[0]} not found!`, error: `Thread ${params[0]} not found!` });
            return;
		}

		sendSuccessResponse(res, { message: `Thread ${params[0]} fetched succesfully!`, content: row });
	});
});

// api: create new thread
router.post("/api/threads", (req, res) => {
	const { title, content } = req.body;
	const query = `INSERT INTO threads (title, content) VALUES (?, ?)`;
	const params = [title, content];

	console.log(
		`api: creating new thread // title: ${title} // content: ${content}`
	);

	db.run(query, params, function (err: Error | null) {
		if (err) {
			sendErrorResponse(res, 500, { message: "POST /api/threads/ failed!", error: err.message });
			return;
		}
		console.log(
			`api: creating new thread // thread created! // title: ${title}`
		);
		sendSuccessResponse(res, { message: "New thread created succesfully!", content: { id: this.lastID, title, content } });
	});
});

export default router;