import React, { useEffect, useState } from 'react';
import { useEmailStore } from '../common/store';

export default function App() {
  const [emails, setEmails] = useState([]);
  const { categories } = useEmailStore();

  useEffect(() => {
    // Function to scan Gmail emails
    const scanEmails = () => {
      const emailElements = document.querySelectorAll('[role="row"]:has([role="checkbox"])');
      const parsedEmails = Array.from(emailElements).map(el => {
        return {
          subject: el.querySelector('[data-thread-id]')?.textContent || 'No subject',
          sender: el.querySelector('[email]')?.textContent || 'Unknown sender',
          element: el
        };
      });
      setEmails(parsedEmails);
    };

    // Initial scan
    scanEmails();
    
    // Set up observer for new emails
    const observer = new MutationObserver(scanEmails);
    observer.observe(document.querySelector('[role="main"]'), {
      childList: true,
      subtree: true
    });
    
    return () => observer.disconnect();
  }, []);

  const categorizeEmail = (email, category) => {
    // Add visual indicator
    const badge = document.createElement('div');
    badge.textContent = categories[category].name;
    badge.style.backgroundColor = categories[category].color;
    badge.style.padding = '2px 8px';
    badge.style.borderRadius = '4px';
    badge.style.marginLeft = '10px';
    email.element.prepend(badge);
  };

  return (
    <div className="inboxpert-ui">
      <h3>Inboxpert</h3>
      <div className="email-list">
        {emails.map((email, i) => (
          <div key={i} className="email-item">
            <span>{email.sender}: {email.subject}</span>
            <div className="category-buttons">
              {Object.keys(categories).map(cat => (
                <button 
                  key={cat}
                  onClick={() => categorizeEmail(email, cat)}
                  style={{ backgroundColor: categories[cat].color }}
                >
                  {categories[cat].name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}