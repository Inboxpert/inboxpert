import fetch from 'node-fetch';
import Email from '../models/Email.js';
import Category from '../models/Category.js';

export async function categorizeEmail(emailId) {
  try {
    const email = await Email.findById(emailId).populate('user');
    if (!email) throw new Error('Email not found');
    
    // Get user's custom categories
    const categories = await Category.find({ user: email.user });
    const categoryNames = categories.map(c => c.name).join(', ');
    
    const prompt = `
      Categorize this email into one of these categories: 
      ${categoryNames || 'Work, Personal, Promotions, Social, Important'}. 
      Return only the category name.
      
      Email content: "${email.content.slice(0, 500)}"
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 20
      })
    });

    const data = await response.json();
    const category = data.choices[0].message.content.trim();
    
    // Update email with category
    email.category = category;
    await email.save();
    
    return category;
  } catch (error) {
    console.error('AI Categorization Error:', error);
    throw error;
  }
}