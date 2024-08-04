import express from "express";
import threadAPIRoutes from "./api/threads";
import postAPIRoutes from "./api/posts";
import cors from "cors";
import config from "../config.json";

const app = express();
const PORT = config.backend.port;

app.use(express.json());
app.use(cors());
app.use(threadAPIRoutes);
app.use(postAPIRoutes);

app.get("*", (req, res) => {
	res.send("You stupid");
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
