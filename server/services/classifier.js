// services/classifier.js
export function classify(text = "", subject = "") {
    const t = (subject + " " + text).toLowerCase();
    if (/\b(invoice|payment|receipt|bill|transaction)\b/.test(t)) return "Finance";
    if (/\b(discount|sale|promo|offer|coupon)\b/.test(t)) return "Promotions";
    if (/\b(meeting|project|deadline|task|schedule|agenda)\b/.test(t)) return "Work";
    if (/\b(spam|unsubscribe|lottery|win|free)\b/.test(t)) return "Spam";
    return "Personal";
}
