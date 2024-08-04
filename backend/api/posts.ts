import express from "express";
import db from "../db";
import { post } from "../../types/posts";

const router = express.Router();

// api: get all posts in all threads
router.get("/api/posts/", (req, res) => {
	const query = "SELECT * FROM posts ORDER BY thread_id ASC, id DESC";

	db.all(query, [], function (err: Error | null, rows: post[]) {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		if (!rows) {
			return res.status(404).json({ error: "No posts found!" });
		}

		res.status(200).json({ posts: rows });
	});
});

// api: get posts in specific thread
router.get("/api/posts/:thread_id", (req, res) => {
	const query = `SELECT * FROM posts WHERE thread_id = ? ORDER BY id ASC`;
	const params = [req.params.thread_id];

	db.all(query, params, function (err: Error | null, rows: post[]) {
		if (err) {
			return res.status(500).json({
				message: `GET /api/posts/${params[0]} failed!`,
				error: err.message,
			});
		}

		if (!rows) {
			return res.status(404).json({ error: `Thread ${params[0]} not found!` });
		}

		res.status(200).json({ posts: rows });
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
			return res
				.status(500)
				.json({ message: "POST /api/posts/ failed!", error: err.message });
		}

		console.log(
			`api: creating new post in thread ${params[0]} // post created! // content: ${content}`
		);
		res.status(200).json({
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