import Router from "express-promise-router";

import {makeMove, createGame, getGames} from "../controllers/game-controller";

// /api/game

const router = Router();

router.get("/", getGames)
router.get("/new-game", createGame);
router.post("/move", makeMove);

export default router;