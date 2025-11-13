import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ Falta la variable MONGO_URI en .env.local");
}

declare global {
  // allow global cache across module reloads (dev / hot-reload)
  // eslint-disable-next-line no-var
  var _mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

/**
 * connectDB - Reutiliza la conexión de mongoose almacenada en `global._mongoose`.
 * Esto evita reconectar en cada request (útil en desarrollo con HMR y en entornos que mantienen procesos).
 */
export async function connectDB() {
  if (global._mongoose && global._mongoose.conn) {
    // ya está conectado
    // console.log("⚡ Ya conectado a MongoDB (cached)");
    return global._mongoose.conn;
  }

  if (!global._mongoose) global._mongoose = { conn: null, promise: null };

  if (!global._mongoose.promise) {
    const opts = {
      // evita que mongoose mantenga buffer de operaciones mientras no hay conexión
      bufferCommands: false,
    } as mongoose.ConnectOptions;

    global._mongoose.promise = mongoose.connect(MONGO_URI as string, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    const mongooseInstance = await global._mongoose.promise;
    global._mongoose.conn = mongooseInstance;
    console.log(`✅ Conectado a MongoDB: ${mongooseInstance.connection.name}`);
    return mongooseInstance;
  } catch (err) {
    global._mongoose = { conn: null, promise: null };
    console.error("❌ Error conectando a MongoDB:", err);
    throw err;
  }
}
