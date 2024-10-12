import express from "express";
import * as dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDB } from "./db/conn.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes

app.use(cookieParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
    next();
});

app.use('/api/v1/auth', userRouter)


const startServer = () => {
    try {
        app.listen(port, () => {
            console.log(`Server is started on ${port}`)
        })
        connectDB(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
    }
}

startServer()