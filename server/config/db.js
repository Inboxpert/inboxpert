import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MongoDB URI not set in environment variables');
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}