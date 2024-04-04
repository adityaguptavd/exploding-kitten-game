import express from "express";
import dotenv from "dotenv";
import connect from "./db/connection.mjs";
import cors from "cors";
import auth from "./routes/auth.mjs";
import game from "./routes/game.mjs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

// Cors object for configuration setup
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200,
};

// Configuring cors for every request from localhost:5173 or production url
app.use(cors(corsOptions));

// Get the current directory
const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the React app build directory
app.use(express.static(`${__dirname}/dist`));

// Parse the body content from incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Available Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/game", game);

// catch all handler
app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});