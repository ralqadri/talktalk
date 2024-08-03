import express from "express";
import apiRoutes from "./api";
import cors from "cors";

// const express = require("express");
// const apiRoutes = require("./api");
// const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(apiRoutes);

app.get("*", (req, res) => {
	res.send("You stupid");
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
