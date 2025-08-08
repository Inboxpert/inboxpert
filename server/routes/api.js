// routes/api.js
import express from "express";
import emailsRouter from "./emails.js";

const router = express.Router();

router.get("/hello", (req, res) => res.json({ message: "Hello from backend!" }));

// /api/emails/*
router.use("/emails", emailsRouter);

export default router;
