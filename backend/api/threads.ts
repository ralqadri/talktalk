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
			sendErrorResponse(res, 500, {
				message: "GET /api/threads failed!",
				error: err.message,
			});
			return;
		}

		sendSuccessResponse(res, {
			message: "Thread list fetched succesfully!",
			content: rows,
		});
	});
});

// api: get specific thread
router.get("/api/threads/:id", (req, res) => {
	const query = `SELECT * FROM threads WHERE id = ?`;
	const params = [req.params.id];

	db.get(query, params, function (err: Error | null, row: thread) {
		if (err) {
			sendErrorResponse(res, 500, {
				message: `GET /api/threads/${params[0]} failed!`,
				error: err.message,
			});
			return;
		}

		if (!row) {
			sendErrorResponse(res, 404, {
				message: `Thread ${params[0]} not found!`,
				error: `Thread ${params[0]} not found!`,
			});
			return;
		}

		sendSuccessResponse(res, {
			message: `Thread ${params[0]} fetched succesfully!`,
			content: row,
		});
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
			sendErrorResponse(res, 500, {
				message: "POST /api/threads/ failed!",
				error: err.message,
			});
			return;
		}
		console.log(
			`api: creating new thread // thread created! // title: ${title}`
		);

		const newThread: thread = {
			id: this.lastID,
			title,
			content,
			created_at: new Date().toISOString(),
		};
		sendSuccessResponse(res, {
			message: "New thread created succesfully!",
			content: newThread,
		});
	});
});

// api: get random thread
router.post("/api/threads/random", (req, res) => {
	const query = `SELECT * FROM table ORDER BY RANDOM() LIMIT 1`;

	db.get(query, [], function (err: Error | null, row: thread) {
		if (err) {
			sendErrorResponse(res, 500, {
				message: "GET /api/threads/random failed!",
				error: err.message,
			});
		}

		sendSuccessResponse(res, {
			message: "Random thread fetched succesfully!",
			content: row,
		});
	});
});

export default router;
