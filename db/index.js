import mongoose from "mongoose"

import {DB_HOST, DB_NAME, DB_PORT} from "../config"

mongoose.connect(
	`mongodb://${DB_HOST}:${DB_PORT || 27017}/${DB_NAME}`,
	{useNewUrlParser: true, useUnifiedTopology: true}
);
const {connection} = mongoose;
connection.on("error", () => console.log("Cant't connect to db"));
connection.on("connected", () => console.log("Db successfully connected"))
connection.once("disconnected", () => console.log("Db disconnected"));
