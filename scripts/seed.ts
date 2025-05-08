
// scripts/seed.ts
import { MongoClient } from "mongodb"
import dotenv from "dotenv"

import { customers_acme_inc } from "../data/customers_acme_inc"
import { customers_personal } from "../data/customers_personal"
import { customers_monsters } from "../data/customers_monsters"
import { sales_acme_inc } from "../data/sales_acme_inc"
import { sales_monsters } from "../data/sales_monsters"
import { sales_personal } from "../data/sales_personal"

dotenv.config()

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"
const dbName = "dashboard"

async function seed() {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db(dbName)

    const collections = [
      { name: "customers_acme_inc", data: customers_acme_inc },
      { name: "customers_personal", data: customers_personal },
      { name: "customers_monsters", data: customers_monsters },
      { name: "sales_acme_inc", data: sales_acme_inc },
      { name: "sales_monsters", data: sales_monsters },
      { name: "sales_personal", data: sales_personal },
    ]

    for (const { name, data } of collections) {
      const collection = db.collection(name)
      await collection.deleteMany({})
      await collection.insertMany(data)
      console.log(`✅ Seeded ${name} (${data.length} docs)`)
    }

    console.log("🎉 All data seeded successfully!")
  } catch (err) {
    console.error("❌ Seed failed:", err)
  } finally {
    await client.close()
  }
}

seed()
