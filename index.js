import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./Db/db.js";
import route from "./Routes/todoRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

/* ======================
   Database Connection
====================== */
connectDb();

/* ======================
   Middlewares
====================== */
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json()); // IMPORTANT for POST/PUT

/* ======================
   Routes
====================== */

// API routes
app.use("/csbs", route);

// Test route
app.get("/api/happy", (req, res) => {
    res.status(200).json({
        message: "i have enjoyed with csbs studentssss",
    });
});

/* ======================
   404 Handler (CORRECTED ✅)
   MUST be AFTER all routes
====================== */
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

/* ======================
   Global Error Handler
====================== */
app.use((err, req, res, next) => {
    console.error(`${new Date().toISOString()} - Error:`, err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Something went wrong",
    });
});

/* ======================
   Server Start
====================== */
const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Access URLs:`);
    console.log(`   Local:   http://localhost:${PORT}`);
    console.log(`   Public:  http://52.90.2.228:${PORT}`);
});

/* ======================
   Graceful Shutdown
====================== */
process.on("SIGINT", () => {
    console.log("\n🛑 Shutting down gracefully...");
    server.close(() => {
        console.log("✅ Server stopped");
        process.exit(0);
    });
});
