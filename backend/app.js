const express = require("express");
const apiRoutes = require("./api");
const http = require("http");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(apiRoutes);
app.use(cors());

app.app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
