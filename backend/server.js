import express from "express"
import cors from "cors"
import 'dotenv/config'

const app = express()
const port = process.env.PORT

// Enable CORS for all routes and origins
app.use(cors());

// Enable json serialization
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})