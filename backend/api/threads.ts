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

// api: get random thread
router.get("/api/threads/random", (req, res) => {
	const query = `SELECT * FROM threads ORDER BY RANDOM() LIMIT 1`;

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

// api: get threads in specific board
router.get("/api/threads/board/:board_id", (req, res) => {
	const query = `SELECT * FROM threads WHERE board_id = ?`;
	const params = [req.params.board_id];

	db.all(query, params, function (err: Error | null, rows?: thread[]) {
		if (err) {
			sendErrorResponse(res, 500, {
				message: `GET /api/threads/board/${params[0]} failed!`,
				error: err.message,
			});
			return;
		}

		if (!rows) {
			sendErrorResponse(res, 404, {
				message: `No threads found in board ${params[0]}!`,
				error: `No threads found in board ${params[0]}!`,
			});
			return;
		}

		sendSuccessResponse(res, {
			message: `Threads in board ${params[0]} fetched succesfully!`,
			content: rows,
		});
	}
	);
});

// api: get specific thread
router.get("/api/threads/:id", (req, res) => {
	const query = `SELECT * FROM threads WHERE id = ?`;
	const params = [req.params.id];

	db.get(query, params, function (err: Error | null, row?: thread) {
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
router.post("/api/threads/:board_id", (req, res) => {
	const { title, content } = req.body;
	const query = `INSERT INTO threads (board_id, title, content) VALUES (?, ?)`;
	const params = [req.params.board_id, title, content];

	console.log(
		`api: creating new thread in board ${params[0]} // title: ${title} // content: ${content}`
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
			`api: creating new thread in board ${params[0]} // thread created! // title: ${title} // content: ${content}`
		);

		const newThread: thread = {
			id: this.lastID,
			board_id: parseInt(params[0]),
			title,
			content,
			created_at: new Date().toISOString(),
		};
		sendSuccessResponse(res, {
			message: `New thread on board ${params[0]} created succesfully!`,
			content: newThread,
		});
	});
});

export default router;
