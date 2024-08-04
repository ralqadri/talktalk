import express from "express";
import db from "./db";
import { thread } from "../types/threads";
import { post } from "../types/posts";

const router = express.Router();

// api: get all threads
router.get("/api/threads", (req, res) => {
	const query = `SELECT * FROM threads`;

	db.all(query, [], function (err: Error | null, rows: thread[]) {
		if (err) {
			return res
				.status(500)
				.json({ message: "GET /api/threads failed!", error: err.message });
		}

		res.status(200).json({ threads: rows });
	});
});

// api: get specific thread
router.get("/api/threads/:id", (req, res) => {
	const query = `SELECT * FROM threads WHERE id = ?`;
	const params = [req.params.id];

	db.get(query, params, function (err: Error | null, row: thread) {
		if (err) {
			res.status(500).json({
				message: `GET /api/threads/${params[0]} failed!`,
				error: err.message,
			});
		}

		if (!row) {
			return res.status(404).json({ error: `Thread not found!` });
		}

		res.status(200).json(row);
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

	db.run(query, params, function (err: Error | null)  {
		if (err) {
			return res
				.status(500)
				.json({ message: "POST /api/threads/ failed!", error: err.message });
		}
		console.log(`api: creating new thread // thread created! // title: ${title}`);
		res.status(200).json({
			message: "New thread created succesfully!",
			content: {
				id: this.lastID,
				title: title,
				content: content,
			},
		});
	});
});

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
	const query = `SELECT * FROM posts WHERE thread_id = ? ORDER BY id DESC`;
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

	console.log(`api: creating new post in thread ${params[0]} // content: ${content}`);

	db.run(query, params, function (err: Error | null) {
		if (err) {
			return res
				.status(500)
				.json({ message: "POST /api/posts/ failed!", error: err.message });
		}

		console.log(`api: creating new post in thread ${params[0]} // post created! // content: ${content}`);
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
