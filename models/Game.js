import mongoose from "mongoose";

import Step from "./Step";

const {Schema} = mongoose;

const GameSchema = Schema(
	{
		field: {
			type: [String],
			default: new Array(9).fill("")
		},
		history: {
			type: [{type: Schema.Types.ObjectID, ref: "Step"}],
			default: []
		},
	},
	{timestamps: {createdAt: true}}
);

export default mongoose.model('Game', GameSchema);
