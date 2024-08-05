import express from "express";
import db from "../db";
import { post } from "../../types/posts";
import { sendErrorResponse, sendSuccessResponse } from "../utils";

const router = express.Router();

// api: get all posts in all threads
router.get("/api/posts/", (req, res) => {
	const query = "SELECT * FROM posts ORDER BY thread_id ASC, id DESC";

	db.all(query, [], function (err: Error | null, rows: post[]) {
		if (err) {
			sendErrorResponse(res, 500, { message: "GET /api/posts/ failed!", error: err.message });
            return;
		}

		if (!rows) {
			sendErrorResponse(res, 404, { message: "No posts found!", error: "No posts found!" });
            return;
		}

		sendSuccessResponse(res, { message: "Posts fetched succesfully!", content: rows });
	});
});

// api: get posts in specific thread
router.get("/api/posts/:thread_id", (req, res) => {
	const query = `SELECT * FROM posts WHERE thread_id = ? ORDER BY id ASC`;
	const params = [req.params.thread_id];

	db.all(query, params, function (err: Error | null, rows: post[]) {
		if (err) {
			sendErrorResponse(res, 500, { message: `GET /api/posts/${params[0]} failed!`, error: err.message });
            return;
		}

		if (!rows) {
			sendErrorResponse(res, 404, { message: `No posts found on thread ${params[0]}!`, error: `No posts found on thread ${params[0]}!` });
			return;
		}

		sendSuccessResponse(res, { message: `Posts on thread ${params[0]} fetched succesfully!`, content: rows });
	});
});

// api: create new post in a thread
router.post("/api/posts/:thread_id", (req, res) => {
	const { content } = req.body;
	const query = `INSERT INTO posts (thread_id, content) VALUES (?, ?)`;
	const params = [req.params.thread_id, content];

	console.log(
		`api: creating new post in thread ${params[0]} // content: ${content}`
	);

	db.run(query, params, function (err: Error | null) {
		if (err) {
			sendErrorResponse(res, 500, { message: "POST /api/posts/ failed!", error: err.message });
            return;
		}

		console.log(
			`api: creating new post in thread ${params[0]} // post created! // content: ${content}`
		);
		sendSuccessResponse(res, {
			message: `New post on thread ${params[0]} created succesfully!`,
			content: {
				thread_id: params[0],
				id: this.lastID,
				content: content,
			},
		});
	});
});

export default router;