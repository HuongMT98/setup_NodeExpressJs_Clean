import { MongoClient } from "mongodb"
import { ServerApiVersion } from "mongodb"
import env from "./environment.js"

const MONGODB_URI = env.MONGODB_URI

const DATABASE_NAME = env.DATABASE_NAME

let databaseInstance = null

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

// Connect to the database
const CONNECT_DB = async () => {
  if (databaseInstance) {
    throw new Error("Database is already connected")
  }

  try {
    if (!MONGODB_URI || typeof MONGODB_URI !== "string") {
      throw new Error("MONGODB_URI is not defined or is not a string")
    }

    await client.connect()

    databaseInstance = client.db(DATABASE_NAME)
  } catch (err) {
    console.error(err)
    throw new Error("Error connecting to the database")
  }
}

const GET_DB = () => {
  if (!databaseInstance) {
    throw new Error("Database is not connected")
  } else {
    return databaseInstance
  }
}

export { CONNECT_DB, GET_DB }
