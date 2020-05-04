import * as yup from "yup";

export const updateGameSchema = yup.object().shape({
	gameId: yup.string().required(),
	player: yup.string().required().oneOf(["X", "O"]),
	position: yup.number().required().min(0).max(8)
})