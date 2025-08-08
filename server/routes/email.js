import express from 'express';
import { fetchEmails } from '../services/emailService.js';

const router = express.Router();

router.post('/fetch', async (req, res) => {
  const { db } = req.app.locals;
  const { email, password, imapConfig } = req.body;
  
  try {
    const emails = await fetchEmails(email, password, imapConfig);
    
    // Store in database
    for (const email of emails) {
      await db.run(
        `INSERT INTO emails (user_id, subject, sender, content) 
         VALUES (?, ?, ?, ?)`,
        [req.user.id, email.subject, email.from, email.text]
      );
    }
    
    res.json({ count: emails.length });
  } catch (error) {
    res.status(500).json({ error: 'Email fetch failed' });
  }
});

export default router;