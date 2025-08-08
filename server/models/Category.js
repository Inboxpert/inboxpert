import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  keywords: [String]
});

export default mongoose.model('Category', categorySchema);