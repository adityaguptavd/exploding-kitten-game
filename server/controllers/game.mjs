import getUsername from "../middleware/getUsername.mjs";
import User from "../db/models/User.mjs";
import { body, validationResult } from "express-validator";

export const fetchUser = [
  getUsername,
  async (req, res, next) => {
    try {
      const user = await User.findOne(
        { username: req.username },
        "-_id -password -__v"
      );
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

export const getLeaderBoard = [
  getUsername,
  async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.username });
      if (!user) {
        return res.status(401).json({ error: "Invalid Credentials!" });
      }

      // Get the leaderboard
      const leaderboard = await User.find({}, "-_id -password -__v -updatedAt")
        .sort({ wonMatches: -1, updatedAt: 1 })
        .limit(10);
      if (!leaderboard) {
        return res.status(500).json({ error: "Something went wrong!" });
      }

      // Get the rank of the user
      const usersWithMoreWins = await User.countDocuments({
        wonMatches: { $gt: user.wonMatches },
      });
      const userWithMoreWinsAndLessLoses = await User.countDocuments({
        wonMatches: user.wonMatches,
        loseMatches: {$lt: user.loseMatches},
      })
      const usersWithSameWinsAndSameLosesAndEarlierDate = await User.countDocuments({
        wonMatches: user.wonMatches,
        loseMatches: user.loseMatches,
        updatedAt: { $lt: user.updatedAt },
      });
      const rank = usersWithMoreWins + userWithMoreWinsAndLessLoses + usersWithSameWinsAndSameLosesAndEarlierDate + 1;

      return res.status(200).json({ leaderboard, rank });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

export const saveGame = [
  getUsername,
  // validation rules
  body("isWon").exists().isBoolean().withMessage("Match status must be boolean."),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.findOne({ username: req.username });
      if (!user) {
        return res.status(401).json({ error: "Invalid Credentials!" });
      }

      if (req.body.isWon) {
        user.wonMatches += 1;
      } else {
        user.loseMatches += 1;
      }
      await user.save();
      return res.status(200).json({ message: "Game saved on server" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
];