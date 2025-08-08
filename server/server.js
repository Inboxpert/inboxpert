// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/api.js";
import cron from "node-cron";
import { syncEmails } from "./services/emailService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", apiRoutes);

app.get("/", (req, res) => res.send("✅ Backend up"));

// Cron: run every 5 minutes (change schedule as needed)
if (process.env.ENABLE_CRON !== "false") {
    cron.schedule("*/5 * * * *", async () => {
        console.log("[cron] starting sync at", new Date().toISOString());
        try {
            const count = await syncEmails();
            console.log(`[cron] synced ${count} emails`);
        } catch (err) {
            console.error("[cron] sync error:", err);
        }
    });
}

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
