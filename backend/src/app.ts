import express from "express"
import cors from "cors"
import authRouter from "./routes/authRoutes"
import chatRouter from "./routes/chatRoute"

import router from "./routes/route"
import routerPublic from "./routes/routePublic"

import path from "path";

const app = express()



const allowedOrigins = [
    "http://localhost:5173",
    "https://sickabot.metanum.shop"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue" })
})

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.use('/api', routerPublic)

app.use("/api/auth", authRouter)

app.use("/api", chatRouter)
app.use("/api", router)


export default app