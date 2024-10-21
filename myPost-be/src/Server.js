import express from "express"
import cors from "cors"
import env from "dotenv"
import routePage from "./Router/AuthRoute/routePage"
import apiPost from "./Router/PostRoute/routePost"


const app = express()
env.config()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json({
    limit : "100mb"
}))

app.use(express.urlencoded({
    extended : "true"
}))

app.use(routePage)
app.use(apiPost)

app.listen(PORT, () => {
   console.info(
    `
    =====================
      SERVER RUN ON http://localhost:${PORT}
    =====================
    `
   )
} )