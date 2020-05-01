import dotenv from "dotenv";

dotenv.config();

export const {
	SERVER_PORT,
	DB_HOST,
	DB_PORT,
	DB_NAME
} = process.env;