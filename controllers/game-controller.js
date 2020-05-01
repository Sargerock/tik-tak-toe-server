import {Game, Step} from "../models"
import {checkWinner, getRandomPosition} from "../utils";

export const createGame = async (req, res) => {
	const game = await Game.create({});
	res.status(201).json({id: game._id, field: game.field})
}

const updateGame = async (game, player, position) => {
	const field = [...game.field];
	field[position] = player;
	game.field = field;
	const step = await Step.create({gameId: game._id, player, position, field});
	game.history.push(step);
	await game.save();
}

export const makeMove = async (req, res) => {
	const {gameId, player, position} = req.body;
	const bot = player === "X" ? "O" : "X";

	const game = await Game.findById(gameId);
	await updateGame(game, player, position)
	if (checkWinner(game.field)) {
		return res.status(200).json({field: game.field, message: `Player wins the game!`, isGameOver: true});
	}
	if (game.field.every(value => value)) {
		return res.status(200).json({field: game.field, message: "Draw.", isGameOver: true});
	} else {
		await updateGame(game, bot, getRandomPosition(game.field));
		if (checkWinner(game.field)) {
			return res.status(200).json({field: game.field, message: `Bot wins the game!`, isGameOver: true});
		}
	}
	res.status(200).json({field: game.field});
}

export const getGames = async (req, res) => {
	const {offset, limit} = req.query;
	const games = await Game.find({})
		.sort("-createdAt")
		.skip(+offset)
		.limit(+limit)
	const totalCount = await Game.estimatedDocumentCount()
	res.status(200).json({games, totalCount});
}
