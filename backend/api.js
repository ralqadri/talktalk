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

// api:

module.exports = router;
