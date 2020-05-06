import {Game, Step} from "../models"
import {checkDraw, checkVictory, getRandomPosition} from "../utils";

export const createGame = async (req, res) => {
	const {player} = req.body;
	const game = await Game.create({player});
	if (player === "O") {
		await game.makeStep("X", getRandomPosition(game.field));
	}
	res.status(201).json(game)
}

const performAndCheckStep = async (game, player, position) => {
	await game.makeStep(player, position);
	if (checkVictory(game.field)) {
		game.winner = player;
		await game.save();
		return true;
	} else {
		return checkDraw(game.field);
	}
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

	const isGameOver =
		await performAndCheckStep(game, player, position) ||
		await performAndCheckStep(game, bot, getRandomPosition(game.field));

	res.status(200).json({game, isGameOver});
}

export const getGames = async (req, res) => {
	const {offset = 0, limit = 10} = req.query;
	const games = await Game.find({winner: {$exists: true}})
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
	const isGameOver = checkVictory(game.field) || checkDraw(game.field);
	res.status(200).json({game, isGameOver});
}
