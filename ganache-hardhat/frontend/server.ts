import express, { Request, Response } from "express"
import path from "path"

const app = express()
const port = 3333

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + "/index.html"))
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
