import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDb from "./Db/db.js";
import route from './Routes/todoRoutes.js';

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

connectDb();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json())

// http://localhost:5000/csbs
app.use('/csbs', route);
app.use("/api/happy", (req, res) => {
    return res.status(200).json({
        message: "sound isssssssss great guy"
    })
})

app.listen(PORT, "0.0.0.0", () => {
    console.log(`app is listening on port ${PORT}`);
});





