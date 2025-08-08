// routes/emails.js
import express from "express";
import { getEmails, getEmailById, saveFeedback } from "../services/db.js";
import { syncEmails } from "../services/emailService.js";

const router = express.Router();

// GET /api/emails?page=1&limit=20
router.get("/", (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const result = getEmails(page, limit);
    res.json(result);
});

// GET /api/emails/:id
router.get("/:id", (req, res) => {
    const email = getEmailById(req.params.id);
    if (!email) return res.status(404).json({ error: "Not found" });
    res.json(email);
});

// POST /api/emails/feedback  { id, category }
router.post("/feedback", (req, res) => {
    const { id, category } = req.body;
    if (!id || !category) return res.status(400).json({ error: "id and category required" });
    saveFeedback(id, category);
    res.json({ ok: true });
});

// POST /api/emails/sync  (manual trigger)
router.post("/sync", async (req, res) => {
    try {
        const count = await syncEmails();
        res.json({ synced: count });
    } catch (err) {
        console.error("Manual sync error:", err);
        res.status(500).json({ error: "Sync failed", details: err.message });
    }
});

export default router;
