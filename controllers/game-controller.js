import {Game, Step} from "../models"
import {checkWinner, getRandomPosition} from "../utils";

export const createGame = async (req, res) => {
	const game = await Game.create({});
	res.status(201).json(game)
}

export const updateGame = async (req, res) => {
	const {gameId, player, position} = req.body;
	const bot = player === "X" ? "O" : "X";

	const game = await Game.findById(gameId);
	if (!game) {
		return res.status(404).json({message: "Game not found"});
	}
	if (game.field[position]) {
		return res.status(422).json({message: "Validation error", errors: {position: ["Cell isn't empty\n"]}})
	}

	await game.makeStep(player, position);
	if (checkWinner(game.field)) {
		return res.status(200).json({game, message: `Player wins the game!`, isGameOver: true});
	}
	if (game.field.every(value => value)) {
		return res.status(200).json({game, message: "Draw.", isGameOver: true});
	} else {
		await game.makeStep(bot, getRandomPosition(game.field));
		if (checkWinner(game.field)) {
			return res.status(200).json({game, message: `Bot wins the game!`, isGameOver: true});
		}
	}
	res.status(200).json({game});
}

export const getGames = async (req, res) => {
	const {offset = 0, limit = 10} = req.query;
	const games = await Game.find({})
		.sort("-createdAt")
		.skip(+offset)
		.limit(+limit)
	const totalCount = await Game.estimatedDocumentCount()
	res.status(200).json({games, totalCount});
}

export const getStep = async (req, res) => {
	const {id} = req.params;
	const step = await Step.findById(id);
	if (!step) {
		return res.status(404).json({message: "Not found"});
	}
	res.status(200).json(step);
}

export const getGame = async (req, res) => {
	const {id} = req.params;
	const game = await Game.findById(id);
	if (!game) {
		return res.status(404).json({message: "Game not found"});
	}
	if (checkWinner(game.field)) {
		return res.status(200).json({game, message: `Game is over`, isGameOver: true});
	}
	if (game.field.every(value => value)) {
		return res.status(200).json({game, message: "Draw.", isGameOver: true});
	} else {
		res.status(200).json({game});
	}
}
