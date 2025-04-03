// // lib/mongodb.ts
// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI!
// const options = {}

// let client: MongoClient
// let clientPromise: Promise<MongoClient>

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add MONGODB_URI to your .env.local")
// }

// client = new MongoClient(uri, options)
// clientPromise = client.connect()

// export default clientPromise



// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = "dashboard";

const client = new MongoClient(uri);
let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (!cachedClient) {
    await client.connect();
    cachedClient = client;
  }

  return cachedClient.db(dbName);
}

