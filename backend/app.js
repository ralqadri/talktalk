const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;
const db = new sqlite3.Database("board.db");
// const db = new sqlite3.Database(":memory:"); // temporary database

app.use(express.json());

db.serialize(() => {
	// query for `threads` table
	db.run(`
        CREATE TABLE IF NOT EXISTS threads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content VARCHAR(500) NOT NULL, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP        
        )
    `);

	// query for `posts` table
	db.run(`
        CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        thread_id INTEGER NOT NULL,
        content VARCHAR(500) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (thread_id) REFERENCES threads(id)
        )    
    `);
});

// api: get all threads
app.get("/api/threads", (req, res) => {
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
app.get("/api/threads/:id", (req, res) => {
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
app.post("/api/threads", (req, res) => {
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

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
