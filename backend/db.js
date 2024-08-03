const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("board.db", (err) => {
	if (err) {
		console.error(`Error loading database: ${err.message}`);
	} else {
		console.log("Connected to the database.");
		// TODO: Maybe fix this from the database side instead of here
		db.run("PRAGMA foreign_keys = ON", (err) => {
			if (err) {
				console.error(`Failed to enable foreign keys!: ${err.message}`);
			} else {
				console.log("Foreign keys now enabled!");
			}
		});
	}
});

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

module.exports = db;
