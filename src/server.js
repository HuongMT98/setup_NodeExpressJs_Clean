/* eslint-disable no-unused-vars */
import express from "express"
import { CONNECT_DB, GET_DB } from "./configs/mongodb.js"
import env from "./configs/environment.js"
import router from "./routes/v1/index.js"
import errorMiddleware from "./middlewares/errorMiddleware.js"

const START_SERVER = () => {
  const app = express()

  app.use(express.json())

  //use Api routers
  app.use("/v1", router)

  //Middleware xử lý lỗi tập trung
  app.use(errorMiddleware)

  app.get("/", (req, res) => {
    res.send(
      "<h1 style='color: red;font-size: 5rem;display: flex;justify-content: center'>Server On, Ready to Use</h1>"
    )
  })

  app.listen(env.PORT, () => {
    console.log(
      `3: Xin chào ${env.AUTHOR}, server đang chạy ${env.HOST}:${env.PORT}`
    )
  })
}

//Chỉ khi kết nối database thành công thì mới start server
;(async () => {
  try {
    console.log("1: Đang kết nối Database MongoDB...")
    await CONNECT_DB()
    console.log("2: Kết nối Database thành công!")

    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
