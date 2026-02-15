import express from "express"
import type { Express } from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app: Express = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET','POST','DELETE','PATCH','PUT']
}));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.static("public"));
app.use(cookieParser());


// routes import
import userRouter from "../src/routes/Userroute.js"
import categoryRouter from "../src/routes/Categoryroute.js"
import productRouter from "../src/routes/Productroute.js"


app.use("/api/v1/users", userRouter)
app.use("/api/v1/categories",categoryRouter)
app.use("/api/v1/products",productRouter)





import { errorHandler } from "./utils/ErrorHandler.js";
app.use(errorHandler)



//http://localhost:8000/api/v1/users
//http://localhost:8000/api/v1/categories



export {app}