import { Schema, model } from 'mongoose';

// Match Schema
const MatchSchema = new Schema({
  match_id: { type: Number, required: true, unique: true },
  total_overs: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

export const Match = model('Match', MatchSchema);

// Team Schema
const TeamSchema = new Schema({
  team_id: { type: Number, required: true, unique: true },
  team_name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const Team = model('Team', TeamSchema);

// Inning Schema
const InningSchema = new Schema({
  match_id: { type: Number, required: true, ref: 'Match' },
  team_id: { type: Number, required: true, ref: 'Team' },
  inning_number: { type: Number, required: true },
  total_runs: { type: Number, required: true },
  total_overs: { type: Number, required: true },
  balls_faced: { type: Number, required: true },
  fours: { type: Number, required: true },
  sixes: { type: Number, required: true },
  wickets_taken: { type: Number },
  overs_bowled: { type: Number },
  no_balls: { type: Number },
  wides: { type: Number },
  total_bowls_bowled: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

export const Inning = model('Inning', InningSchema);
