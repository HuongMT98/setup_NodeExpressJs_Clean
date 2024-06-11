import "dotenv/config"

const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  AUTHOR: process.env.AUTHOR,
  HOST: process.env.HOST,
  POST: process.env.POST,
}

export default env
