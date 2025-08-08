import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: String,
  sender: String,
  content: String,
  category: String,
  receivedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Email', emailSchema);