import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import fs from "fs";
import path from "path";

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const logDir = path.resolve("logs");

// Ensure logs folder exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Console format (developer friendly)
const consoleFormat = combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} [${level}]: ${stack || message}`;
    })
);

// File format (machine friendly)
const fileFormat = combine(
    timestamp(),
    errors({ stack: true }),
    json()
);

const transports: winston.transport[] = [
    new winston.transports.Console({
        format: consoleFormat
    })
];

// Only write files in production
if (process.env.NODE_ENV === "production") {
    transports.push(
        new DailyRotateFile({
            dirname: logDir,
            filename: "app-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "20m",
            maxFiles: "14d"
        }),
        new DailyRotateFile({
            dirname: logDir,
            filename: "error-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "error",
            maxSize: "10m",
            maxFiles: "30d"
        })
    );
}

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: fileFormat,
    transports,
    exitOnError: false
});

export default logger;
