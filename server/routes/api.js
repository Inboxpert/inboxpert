// routes/api.js
import express from "express";
const router = express.Router();

// Example API endpoint
router.get("/hello", (req, res) => {
    res.json({ message: "Hello from Node.js backend!" });
});

// Example POST endpoint
router.post("/data", (req, res) => {
    const { name } = req.body;
    res.json({ message: `Received data for ${name}` });
});

export default router;
