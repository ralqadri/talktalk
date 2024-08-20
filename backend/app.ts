import express from "express";
import cors from "cors";
import session from "express-session";
import config from "../config.json";

import authRoutes from "./api/auth";
import boardAPIRoutes from "./api/boards";
import threadAPIRoutes from "./api/threads";
import postAPIRoutes from "./api/posts";

declare module 'express-session' {
    interface SessionData {
        isAdmin?: boolean;
    }
}

const app = express();
const PORT = config.backend.port;

app.use(express.json());
app.use(cors());

app.use(session({
	secret: config.admin.secret,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: process.env.NODE_ENV === "production",
	},
}));

app.use(authRoutes);
app.use(boardAPIRoutes);
app.use(threadAPIRoutes);
app.use(postAPIRoutes);

app.get("*", (req, res) => {
	res.send("You stupid");
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
