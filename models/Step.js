import mongoose from "mongoose";

const {Schema} = mongoose;

const StepSchema = Schema(
	{
		gameId: {
			type: Schema.Types.ObjectID,
			ref: "Game",
			required: true
		},
		player: {
			type: String,
			required: true,
		},
		position: {
			type: Number,
			required: true,
		},
		field: {
			type: [String],
			required: true
		},
	}
);

export default mongoose.model('Step', StepSchema);
