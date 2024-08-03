const express = require("express");
const db = require("./db");

const router = express.Router();

// api: get all threads
router.get("/api/threads", (req, res) => {
	const query = `SELECT * FROM threads`;

	db.all(query, [], (err, rows) => {
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

	db.get(query, params, (err, row) => {
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

	db.run(query, params, (err) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "POST /api/threads/ failed!", error: err.message });
		}
		res.status(200).json({
			message: "New thread created succesfully!",
			content: {
				title: title,
				content: content,
			},
		});
	});

	console.log(`api: creating new thread // thread created! // title: ${title}`);
});

// api: create new post in a thread
router.post("/api/posts/:thread_id", (req, res) => {
	const { content } = req.body;
	const query = `INSERT INTO posts (thread_id, content) VALUES (?, ?)`;
	const params = [req.params.thread_id, content];

	console.log(`api: creating new post in thread ${params[0]}`);

	db.run(query, params, (err, row) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "POST /api/posts/ failed!", error: err.message });
		}

		res.status(200).json({
			message: `New post on thread ${params[0]} created succesfully!`,
			content: {
				thread_id: params[0],
				content: content,
			},
		});
	});
});

// api: get posts in specific thread
router.get("/api/posts/:thread_id", (req, res) => {
	const query = `SELECT * FROM posts WHERE thread_id = ?`;
	const params = [req.params.thread_id];

	db.get(query, params, (err, row) => {
		if (err) {
			return res.status(500).json({
				message: `GET /api/posts/${params[0]} failed!`,
				error: err.message,
			});
		}

		if (!row) {
			return res.status(404).json({ error: `Thread ${params[0]} not found!` });
		}

		res.status(200).json(row);
	});
});

// api: get all posts in all threads
// router.get("/api/posts/", (req, res) => {
// 	const query =
// });

module.exports = router;
