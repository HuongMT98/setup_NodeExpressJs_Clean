import { MongoClient } from "mongodb"
import env from "./environment.js"

let databaseInstance = null

// Connect to the database
const CONNECT_DB = async () => {
  try {
    const client = await MongoClient.connect(env.MONGODB_URL, {
      // useNewUrlParser: false,
      // useUnifiedTopology: true,
    })
    console.log("1.1: Đã kết nối được MongoDB")

    return client
  } catch (error) {
    console.error("1.2: Error connecting to MongoDB:", error)
    throw error
  }
}

const GET_DB = () => {
  if (!databaseInstance) {
    throw new Error("Database not connected")
  } else {
    return databaseInstance
  }
}

export { CONNECT_DB, GET_DB }
