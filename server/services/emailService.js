// services/emailService.js
import { upsertEmail } from "./db.js";
import { classify } from "./classifier.js";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";

/**
 * syncEmails() will:
 * - if USE_MOCK=true or no IMAP configured -> insert a sample email (for dev/test)
 * - else connect to IMAP and fetch recent messages and upsert them to DB
 *
 * Returns number of synced emails.
 */
export async function syncEmails() {
    // dev/mock mode
    if (process.env.USE_MOCK === "true" || !process.env.IMAP_HOST) {
        const sample = {
            id: `mock-${Date.now()}`,
            sender: "alice@example.com",
            subject: "Welcome to the service",
            date: new Date().toISOString(),
            snippet: "Hello — this is a mock email for testing.",
            body: "Full body of mock email",
            category: classify("Full body of mock email", "Welcome"),
            feedback: null,
        };
        upsertEmail(sample);
        return 1;
    }

    const client = new ImapFlow({
        host: process.env.IMAP_HOST,
        port: Number(process.env.IMAP_PORT) || 993,
        secure: true,
        auth: {
            user: process.env.IMAP_USER,
            pass: process.env.IMAP_PASSWORD, // for Gmail prefer OAuth or App Password
        },
    });

    await client.connect();
    let synced = 0;
    try {
        // open INBOX
        await client.mailboxOpen("INBOX");
        // fetch last N messages (change search as needed)
        // Here we fetch the last 50 uids
        const lock = await client.getMailboxLock("INBOX");
        try {
            const { exists } = client.mailbox;
            const from = Math.max(1, exists - 49);
            for await (const message of client.fetch(`${from}:${exists}`, { source: true, envelope: true, uid: true })) {
                try {
                    const parsed = await simpleParser(message.source);
                    const id = message.uid ? `imap-${message.uid}` : `imap-${Date.now()}`;
                    const body = parsed.text || parsed.html || "";
                    const emailObj = {
                        id,
                        sender: parsed.from?.text || "",
                        subject: parsed.subject || "",
                        date: parsed.date ? parsed.date.toISOString() : new Date().toISOString(),
                        snippet: (body || "").slice(0, 300),
                        body,
                        category: classify(body, parsed.subject || ""),
                        feedback: null,
                    };
                    upsertEmail(emailObj);
                    synced++;
                } catch (innerErr) {
                    console.warn("Failed parse message:", innerErr);
                }
            }
        } finally {
            lock.release();
        }
    } finally {
        await client.logout();
    }
    return synced;
}
