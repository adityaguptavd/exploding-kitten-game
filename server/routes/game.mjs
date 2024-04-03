import { Router } from "express";
import { fetchUser, getLeaderBoard, saveGame } from "../controllers/game.mjs";

const router = Router();

router.get("/fetchUser", fetchUser);
router.get("/leaderboard", getLeaderBoard);
router.patch("/saveGame", saveGame);

export default router;