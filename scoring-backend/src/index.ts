import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import scoreRoutes from "./routes/scoreRoutes"; // Import route file

// Initialize DB Connection
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/scores", scoreRoutes); // Mount `scoreRoutes` under `/api/scores`


// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
