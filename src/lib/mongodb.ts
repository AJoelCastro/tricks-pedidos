import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("❌ Falta la variable MONGO_URI en .env.local");
}

let isConnected = false; // evitar reconexiones múltiples en hot reload

export async function connectDB() {
  if (isConnected) {
    console.log("⚡ Ya conectado a MongoDB");
    return;
  }

  try {
    const conn = await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log(`✅ Conectado a MongoDB: ${conn.connection.name}`);
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err);
    throw err;
  }
}
