import express from "express";
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 4000

app.get("/", (req, res) => {
    res.send("Server started")
})

const startServer = () => {
    try {
        app.listen(port, () => {
            console.log(`Server is started on ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()