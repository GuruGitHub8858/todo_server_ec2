import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDb from "./Db/db.js";
import route from './Routes/todoRoutes.js';

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

connectDb();

//middle wares
app.use(cors())
app.use(express.json())

// http://localhost:5000/csbs
app.use('/csbs', route);
app.use("/api/happy", (req, res) => {
    return res.status(200).json({
        message: "sound isssssssss great guy"
    })
})

app.listen(PORT, () => {
    console.log(`app is listening in ${PORT}`);
})




