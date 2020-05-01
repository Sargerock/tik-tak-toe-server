import express from "express";
import cors from "cors";

import {SERVER_PORT} from "./config";
import {errorHandler} from "./utils/errorHandler";
import router from "./routers";
import "./db"

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(SERVER_PORT || 8000, () => {
	console.log("Server is running on port: ", SERVER_PORT);
});