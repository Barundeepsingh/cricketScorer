import express, { Router } from "express";
import {createMatch, updateScore} from "../controllers/matchController";

const router: Router = express.Router();

// Define POST and GET routes
router.post("/createMatch", createMatch); // POST to "/api/scores/update"
router.post("/scoreUpdate", updateScore); // POST to "/api/scores/update"

router.get("/test", (req, res) => {
    res.status(200).send("Test route from scoreRoutes!");
});

export default router;
