import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDb from "./Db/db.js";
import route from './Routes/todoRoutes.js';

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

connectDb();

app.use(cors())

// http://localhost:5000/csbs
app.use('/csbs', route);

app.use("/api/happy", (req, res) => {
    return res.status(200).json({
        message: "i have enjoyed with csbs students"
    })
})

// Global error handler
app.use((err, req, res, next) => {
    console.error(`${new Date().toISOString()} - Error:`, err.stack)
    res.status(500).json({ error: 'Something broke!' })
})

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Access URLs:`);
    console.log(`   Local: http://localhost:${PORT}`);
    console.log(`   Network: http://0.0.0.0:${PORT}`);
    console.log(`   Public: http://52.90.2.228:${PORT} (if accessible)`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down gracefully...');
    server.close(() => {
        console.log('Process terminated!');
        process.exit(0);
    });
});