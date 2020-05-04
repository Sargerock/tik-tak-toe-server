import Router from "express-promise-router";

import {updateGame, createGame, getGames, getStep, getGame} from "../controllers/game-controller";
import {createValidator} from "../utils";
import {updateGameSchema} from "../utils/validation-schemas";

const updateGameValidator = createValidator({body: updateGameSchema});

// /api/game
const router = Router();

router.get("/", getGames)
router.post("/", createGame);
router.put("/", updateGameValidator, updateGame);
router.get("/step/:id", getStep);
router.get("/:id", getGame)

export default router;