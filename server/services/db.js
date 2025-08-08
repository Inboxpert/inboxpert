// services/db.js
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "emails.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

// Table
db.exec(`
CREATE TABLE IF NOT EXISTS emails (
  id TEXT PRIMARY KEY,
  sender TEXT,
  subject TEXT,
  date TEXT,
  snippet TEXT,
  body TEXT,
  category TEXT,
  feedback TEXT
);
`);

// Upsert an email
export function upsertEmail(email) {
    const stmt = db.prepare(`
    INSERT INTO emails (id,sender,subject,date,snippet,body,category,feedback)
    VALUES (@id,@sender,@subject,@date,@snippet,@body,@category,@feedback)
    ON CONFLICT(id) DO UPDATE SET
      sender=excluded.sender,
      subject=excluded.subject,
      date=excluded.date,
      snippet=excluded.snippet,
      body=excluded.body,
      category=excluded.category
  `);
    stmt.run(email);
}

// Pagination list
export function getEmails(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const rows = db.prepare(
        `SELECT id,sender,subject,date,snippet,category FROM emails ORDER BY date DESC LIMIT ? OFFSET ?`
    ).all(limit, offset);
    const { count } = db.prepare("SELECT COUNT(*) as count FROM emails").get();
    return { data: rows, page, limit, total: count };
}

export function getEmailById(id) {
    return db.prepare("SELECT * FROM emails WHERE id = ?").get(id);
}

export function saveFeedback(id, feedback) {
    db.prepare("UPDATE emails SET feedback = ? WHERE id = ?").run(feedback, id);
}
