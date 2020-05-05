import * as yup from "yup";

export default yup.object().shape({
	gameId: yup.string().required(),
	player: yup.string().required().oneOf(["X", "O"]),
	position: yup.number().required().min(0).max(8)
})