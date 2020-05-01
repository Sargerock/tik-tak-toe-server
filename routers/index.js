import Router from "express-promise-router";

import gameRouter from "./game-router";

const router = Router();

router.use("/api/game", gameRouter);

export default router;