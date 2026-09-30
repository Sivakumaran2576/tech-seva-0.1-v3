import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'techseva';

let cached = globalThis.__techsevaMongoose || { conn: null, promise: null };
globalThis.__techsevaMongoose = cached;

export function hasMongo() {
  return Boolean(MONGODB_URI);
}

export async function connectMongo() {
  if (!MONGODB_URI) return null;
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB, bufferCommands: false }).then((m) => m);
  }
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}
