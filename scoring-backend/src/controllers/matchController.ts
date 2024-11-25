import { Request, Response } from "express";
import { Match } from "../models/Match";
import { Team } from "../models/Match";
import { Inning } from "../models/Match";

// Helper function to generate a random 5-digit number
const generateRandomMatchId = (): number => {
    return Math.floor(10000 + Math.random() * 90000); // Ensures a 5-digit number
};

export const createMatch = async (req: Request, res: Response): Promise<void> => {
    const { teamAname, teamBname, overs } = req.body;

    try {
        // Validate input
        if (!teamAname || !teamBname || !overs || overs <= 0) {
            res.status(400).json({ message: "Invalid match details. Ensure team names and overs are provided and valid." });
            return;
        }

        // Find or create teams
        const [teamA, teamB] = await Promise.all([
            Team.findOneAndUpdate(
                { team_name: teamAname },
                { team_id: generateRandomMatchId() },
                { upsert: true, new: true }
            ),
            Team.findOneAndUpdate(
                { team_name: teamBname },
                { team_id: generateRandomMatchId() },
                { upsert: true, new: true }
            ),
        ]);

        // Generate a unique match ID
        let matchId: number = 0;
        let isUnique = false;
        while (!isUnique) {
            matchId = generateRandomMatchId();
            const existingMatch = await Match.findOne({ match_id: matchId });
            if (!existingMatch) {
                isUnique = true;
            }
        }

        // Create match
        const match = new Match({
            match_id: matchId,
            total_overs: overs,
            status: "scheduled",
        });

        // Save the match
        await match.save();

        res.status(201).json({
            message: "Match created successfully.",
            matchDetails: {
                match_id: match.match_id,
                teamA: teamA.team_name,
                teamB: teamB.team_name,
                total_overs: match.total_overs,
            },
        });
    } catch (error) {
        console.error("Error creating match:", error);
        res.status(500).json({ message: "An error occurred while creating the match." });
    }
};


export const updateScore = async (req: Request, res: Response): Promise<void> => {
try{
    const {
        match_id,
        team_id,
        runs = 0,
        extras = { bye: 0, legbye: 0, noball: 0, wide: 0, overthrow: 0 },
        ball_type,
        wicket = false,
      } = req.body;

      if(!match_id || !team_id){
        res.status(400).json({message: "Invalid match or team ID"});
        return;
      }
      const inning = await Inning.findOne({ match_id, team_id });
      if (!inning) {
          res.status(404).json({ message: "Inning not found." });
          return;
      }
      inning.total_runs += runs + extras.bye + extras.legbye + extras.noball + extras.wide + extras.overthrow;

      inning.no_balls = (inning.no_balls || 0) + (ball_type === "noball" ? 1 : 0);
      inning.wides = (inning.wides || 0) + (ball_type === "wide" ? 1 : 0);

      if (ball_type !== "wide" && ball_type !== "noball") {
        inning.balls_faced += 1;
        inning.total_bowls_bowled += 1;
        inning.total_overs = Math.floor(inning.balls_faced / 6) + (inning.balls_faced % 6) / 10;
      }

      if (wicket) {
        inning.wickets_taken = (inning.wickets_taken || 0) + 1;
      }

      await inning.save();
      res.status(200).json({ message: "Score updated successfully.", inning });
} catch (error) {
    console.error("Error updating score:", error);
    res.status(500).json({ error: "An error occurred while updating the score." });
  }
};

