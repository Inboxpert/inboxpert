// routes/api.js
import express from "express";
import emailRouter from "./email.js";

const router = express.Router();

router.get("/hello", (req, res) => res.json({ message: "Hello from backend!" }));

// /api/emails/*
router.use("/emails", emailRouter);

export default router;
