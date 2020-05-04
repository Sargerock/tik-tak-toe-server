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
	{timestamps: true}
);

class Game {
	async makeStep(player, position) {
		const field = [...this.field];
		field[position] = player;
		this.set({field});
		const step = await Step.create({gameId: this.id, player, position, field});
		this.history.push(step);
		await this.save();
		return this;
	}
}

GameSchema.loadClass(Game);

GameSchema.set("toJSON", {virtuals: true})

export default mongoose.model('Game', GameSchema);
