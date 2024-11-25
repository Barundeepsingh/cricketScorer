import React, {useState, useEffect} from "react";
import { uniqueNamesGenerator, names } from "unique-names-generator";
import "./Scorer.css";


const generateRandomName = () =>
  uniqueNamesGenerator({
    dictionaries: [names], // Use the names dictionary
    length: 1,
  });

const Scorer = () => {

  const [striker, setStriker] = useState("");
  const [nonStriker, setNonStriker] = useState("");

  // Generate random names for Striker and Non-Striker
  useEffect(() => {
    setStriker(generateRandomName());
    setNonStriker(generateRandomName());
  }, []);

  return (
    <div className="container">
      {/* Commentary Buttons */}
      <div className="commentary-section">
        <h2>Commentary Buttons</h2>
        <div className="players">
          <div>
            <label>Striker</label>
            <input type="text" value={striker} readOnly />
          </div>
          <div>
            <label>Non-Striker</label>
            <input type="text" value={nonStriker} readOnly />
          </div>
        </div>
        <div className="buttons">
          {[0, 1, 2, 3, 4, 6].map((run) => (
            <button key={run}>{run}</button>
          ))}
          <button>Wicket</button>
          <button>Wide</button>
          <button>No-ball</button>
          <button>Bye</button>
          <button>Legbye</button>
          <button>New Ball</button>
        </div>
      </div>

      {/* Scorecard Section */}
      <div className="scorecard-section">
        <h2>Team Scorecard</h2>
        <div className="team-scorecard">
          <p>Static Team Name</p>
          <p>Runs / Wickets</p>
          <p>Balls & Overs</p>
          <div className="extras">
            <p>Wide: 0</p>
            <p>No-ball: 0</p>
            <p>Legbye: 0</p>
            <p>Bye: 0</p>
          </div>
        </div>

        <h2>Player Scorecard</h2>
        <div className="player-scorecard">
          <div className="batsman">
            <h3>Batsman</h3>
            <p>Player 1 Name + Runs</p>
            <p>Player 2 Name + Runs</p>
            <p>Player 3 Name + Runs</p>
          </div>
          <div className="bowler">
            <h3>Bowler</h3>
            <p>Player 1 Name + Runs + Overs + Maidens</p>
            <p>Player 2 Name + Runs + Overs + Maidens</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scorer;
