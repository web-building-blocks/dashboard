// lib/mongodb.ts
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI!
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your .env.local")
}

client = new MongoClient(uri, options)
clientPromise = client.connect()

export default clientPromise
