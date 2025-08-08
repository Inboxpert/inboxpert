// server.js
import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.js";

const app = express();
const PORT = 5000; // Your backend port

// Middleware
app.use(cors()); // Allow requests from any origin
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api", apiRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
