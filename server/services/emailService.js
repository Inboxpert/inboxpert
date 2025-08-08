import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import Email from '../models/Email.js';

export async function fetchEmails(userId, email, password, imapConfig) {
  const client = new ImapFlow({
    host: imapConfig.host || 'imap.gmail.com',
    port: imapConfig.port || 993,
    secure: true,
    auth: { user: email, pass: password }
  });

  const messages = [];
  
  try {
    await client.connect();
    const lock = await client.getMailboxLock('INBOX');
    
    for await (let message of client.fetch('1:*', { source: true })) {
      const parsed = await simpleParser(message.source);
      
      // Save to MongoDB
      const emailDoc = new Email({
        user: userId,
        subject: parsed.subject,
        sender: parsed.from?.value[0]?.address || 'unknown',
        content: parsed.text || parsed.html || ''
      });
      
      await emailDoc.save();
      messages.push(emailDoc);
    }
    
    lock.release();
  } finally {
    await client.logout();
  }
  
  return messages;
}