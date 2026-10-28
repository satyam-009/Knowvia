
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import chalk from "chalk";

import authRouter from "./routes/auth.route.js";
import chatRouter from "./routes/chats.route.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    })
);

// Colorful HTTP logger
morgan.token("date-ist", () =>
    new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
    })
);

morgan.token("colored-status", (req, res) => {
    const status = res.statusCode;

    if (status >= 500) return chalk.red.bold(status);
    if (status >= 400) return chalk.yellow.bold(status);
    if (status >= 300) return chalk.cyan.bold(status);
    if (status >= 200) return chalk.green.bold(status);

    return chalk.white(status);
});

morgan.token("colored-method", (req) => {
    const colors = {
        GET: chalk.blue.bold,
        POST: chalk.green.bold,
        PUT: chalk.yellow.bold,
        PATCH: chalk.magenta.bold,
        DELETE: chalk.red.bold,
        OPTIONS: chalk.gray,
    };

    return (colors[req.method] || chalk.white)(req.method);
});

morgan.token("colored-response-time", (req, res) => {
    const time = Number(morgan["response-time"](req, res));

    if (!Number.isFinite(time)) return chalk.gray("pending");

    const color =
        time < 100
            ? chalk.green
            : time < 500
              ? chalk.yellow
              : chalk.red;

    return color(`${time.toFixed(2)} ms`);
});

app.use(
    morgan(
        (tokens, req, res) => {
            return [
                chalk.gray(`[${tokens["date-ist"]()} IST]`),
                tokens["colored-method"](req, res),
                chalk.white(tokens.url(req, res)),
                tokens["colored-status"](req, res),
                chalk.gray("-"),
                tokens["colored-response-time"](req, res),
            ].join(" ");
        }
    )
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

export default app;
