import express from "express";
import apiRoutes from "./api";
import cors from "cors";
import config from "../config.json";

const app = express();
const PORT = config.backend.port;

app.use(express.json());
app.use(cors());
app.use(apiRoutes);

app.get("*", (req, res) => {
	res.send("You stupid");
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
